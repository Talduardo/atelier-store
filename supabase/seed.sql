-- ─────────────────────────────────────────────────────────────────────────────
-- Atelier Store — Schema + RLS + Seed
-- ─────────────────────────────────────────────────────────────────────────────

-- Extensions
create extension if not exists "uuid-ossp";

-- ─── Categories ──────────────────────────────────────────────────────────────
create table if not exists categories (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  slug        text not null unique,
  description text,
  image_url   text,
  created_at  timestamptz default now()
);

-- ─── Products ─────────────────────────────────────────────────────────────────
create table if not exists products (
  id             uuid primary key default uuid_generate_v4(),
  name           text not null,
  slug           text not null unique,
  description    text,
  price          numeric(10,2) not null,
  original_price numeric(10,2),
  stock          integer not null default 0,
  category_id    uuid references categories(id) on delete set null,
  images         text[] default '{}',
  is_active      boolean default true,
  is_featured    boolean default false,
  sku            text unique,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

-- ─── Profiles ─────────────────────────────────────────────────────────────────
create table if not exists profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  phone      text,
  avatar_url text,
  role       text default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Orders ───────────────────────────────────────────────────────────────────
create table if not exists orders (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid references auth.users(id) on delete set null,
  status           text default 'pending' check (status in ('pending','processing','shipped','delivered','cancelled')),
  subtotal         numeric(10,2) not null,
  shipping_cost    numeric(10,2) not null default 0,
  discount         numeric(10,2) not null default 0,
  total            numeric(10,2) not null,
  payment_method   text,
  payment_id       text,
  coupon_code      text,
  shipping_address jsonb,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

create table if not exists order_items (
  id            uuid primary key default uuid_generate_v4(),
  order_id      uuid references orders(id) on delete cascade,
  product_id    uuid references products(id) on delete set null,
  product_name  text not null,
  product_price numeric(10,2) not null,
  quantity      integer not null,
  created_at    timestamptz default now()
);

-- ─── RLS ──────────────────────────────────────────────────────────────────────
alter table categories  enable row level security;
alter table products    enable row level security;
alter table profiles    enable row level security;
alter table orders      enable row level security;
alter table order_items enable row level security;

-- Categories: public read
create policy "categories_public_read" on categories for select using (true);

-- Products: public read active, admin full
create policy "products_public_read" on products for select using (is_active = true);
create policy "products_admin_all" on products for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Profiles: users read/update own
create policy "profiles_own" on profiles for all using (auth.uid() = id);

-- Orders: users see own
create policy "orders_own_read" on orders for select using (auth.uid() = user_id);
create policy "orders_insert" on orders for insert with check (auth.uid() = user_id);
create policy "orders_admin_all" on orders for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

create policy "order_items_read" on order_items for select using (
  exists (select 1 from orders where id = order_id and user_id = auth.uid())
);

-- ─── Seed Data ────────────────────────────────────────────────────────────────
insert into categories (name, slug, description) values
  ('Casa & Décor', 'casa', 'Objetos decorativos para todos os ambientes'),
  ('Iluminação', 'iluminacao', 'Luminárias e pendentes exclusivos'),
  ('Têxtil', 'textil', 'Tapetes, almofadas e tecidos'),
  ('Organização', 'organizacao', 'Cestas, caixas e organizadores')
on conflict (slug) do nothing;

insert into products (name, slug, description, price, original_price, stock, sku, is_featured) values
  ('Vaso Cerâmica Nórdico', 'vaso-ceramica-nordico', 'Vaso em cerâmica artesanal, acabamento fosco.', 289.00, null, 7, 'VCN-001', true),
  ('Luminária de Mesa Arco', 'luminaria-mesa-arco', 'Luminária de mesa com design arco minimalista.', 540.00, 680.00, 4, 'LMA-002', true),
  ('Cesta Palha Natural', 'cesta-palha-natural', 'Cesta artesanal em palha natural.', 165.00, null, 12, 'CPN-003', false),
  ('Espelho Oval Minimal', 'espelho-oval-minimal', 'Espelho oval com moldura slim em metal preto.', 780.00, null, 3, 'EOM-004', true)
on conflict (slug) do nothing;
