# Atelier Store

> E-commerce completo construído com **Next.js 15**, **Supabase**, **TypeScript** e **Tailwind CSS**.  
> Design dark luxury com tema cobre, responsivo e mobile-first.

🌐 **Demo:** [atelier-store-eduardo.netlify.app](https://atelier-store-eduardo.netlify.app)

---

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Banco de Dados](#banco-de-dados)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Deploy](#deploy)
- [Rotas da Aplicação](#rotas-da-aplicação)
- [API Routes](#api-routes)
- [Cupons Disponíveis](#cupons-disponíveis)
- [Painel Administrativo](#painel-administrativo)

---

## Visão Geral

O Atelier Store é um e-commerce completo com autenticação, catálogo de produtos, carrinho persistente, checkout multi-etapas com Stripe e Mercado Pago, painel admin e banco de dados PostgreSQL com Row Level Security.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript |
| UI | Tailwind CSS |
| Banco de Dados | Supabase (PostgreSQL) |
| Autenticação | Supabase Auth |
| Pagamentos | Stripe + Mercado Pago |
| Hospedagem Frontend | Netlify |
| Hospedagem Backend | Supabase |
| Fontes | Cormorant Garamond + DM Sans |

---

## Funcionalidades

### Autenticação
- Cadastro com nome, email e senha
- Login com email e senha
- Magic Link (login sem senha via email)
- Google OAuth
- Proteção automática de rotas via middleware
- Criação automática de perfil via trigger no banco
- Roles: `customer` (padrão) e `admin`

### Loja
- Home com hero, categorias em destaque, produtos featured, banner e trust strip
- Catálogo com filtro por categoria, faixa de preço e busca textual
- Ordenação (relevância, menor/maior preço, mais novos)
- Toggle de visualização (3 ou 4 colunas)
- Página de produto com galeria, accordion, produtos relacionados e quick-add

### Carrinho
- Persistência via localStorage
- Ajuste de quantidade e remoção de itens
- Cálculo automático de subtotal, frete e total
- Frete grátis acima de R$ 299
- Validação de cupom de desconto via API

### Checkout (4 etapas)
1. Endereço de entrega (com busca automática por CEP via ViaCEP)
2. Método de entrega (padrão, expresso, mesmo dia)
3. Pagamento (cartão, Pix, boleto)
4. Revisão e confirmação

### Pedidos
- Histórico completo por usuário
- Status em tempo real com barra de progresso
- Atualização automática via webhooks (Stripe e Mercado Pago)

### Admin
- Dashboard com KPIs do mês (receita, pedidos, ticket médio, novos clientes)
- Alertas de estoque baixo
- Gestão de produtos (listar, editar, ativar/desativar)
- Visualização de pedidos recentes

---

## Estrutura de Pastas

```
atelier-store/
│
├── app/                              # Next.js App Router
│   ├── (auth)/                       # Rotas de autenticação (sem prefixo na URL)
│   │   ├── layout.tsx                # Layout minimalista com header simples
│   │   ├── login/page.tsx            # Login: senha, magic link, Google OAuth
│   │   └── register/page.tsx         # Cadastro com validação de senha
│   │
│   ├── (shop)/                       # Rotas principais da loja
│   │   ├── layout.tsx                # Layout com Header e Footer
│   │   ├── page.tsx                  # Home: hero, categorias, produtos, banner
│   │   ├── cart/page.tsx             # Carrinho dinâmico com useCart hook
│   │   ├── checkout/page.tsx         # Checkout 4 etapas (client component)
│   │   ├── orders/page.tsx           # Histórico de pedidos do usuário
│   │   └── products/
│   │       ├── page.tsx              # Catálogo com filtros e busca
│   │       └── [id]/page.tsx         # Detalhe do produto
│   │
│   ├── admin/                        # Painel administrativo (protegido)
│   │   ├── layout.tsx                # Layout com sidebar de navegação
│   │   ├── page.tsx                  # Dashboard com KPIs e pedidos recentes
│   │   └── products/page.tsx         # Gestão de produtos
│   │
│   ├── api/                          # Route Handlers
│   │   ├── coupon/route.ts           # POST /api/coupon — valida cupom via RPC
│   │   ├── ping/route.ts             # GET /api/ping — health check
│   │   └── webhooks/
│   │       ├── stripe/route.ts       # POST /api/webhooks/stripe
│   │       └── mercadopago/route.ts  # POST /api/webhooks/mercadopago
│   │
│   ├── auth/confirm/route.ts         # Callback OAuth e Magic Link
│   ├── globals.css                   # Estilos globais + variáveis CSS
│   ├── layout.tsx                    # Root layout com fontes e metadata
│   └── not-found.tsx                 # Página 404 customizada
│
├── components/
│   └── layout/
│       ├── Header.tsx                # Header fixo com scroll, menu mobile, carrinho
│       └── Footer.tsx                # Footer com links, newsletter e pagamentos
│
├── hooks/
│   └── use-cart.ts                   # Hook do carrinho (localStorage + cálculos)
│
├── lib/
│   ├── actions/                      # Server Actions
│   │   ├── auth.ts                   # loginWithEmail, register, sendMagicLink, logout
│   │   ├── orders.ts                 # createOrder, updateOrderStatus
│   │   └── products.ts               # createProduct, updateProduct, deleteProduct
│   │
│   ├── queries/                      # Funções de consulta ao Supabase
│   │   ├── products.ts               # getProducts, getProductBySlug, searchProducts
│   │   ├── orders.ts                 # getOrders, getOrderById, getDashboardStats
│   │   ├── categories.ts             # getCategories, getCategoryBySlug
│   │   └── profiles.ts               # getProfile, updateProfile
│   │
│   ├── supabase/
│   │   ├── client.ts                 # Cliente browser (createBrowserClient)
│   │   └── server.ts                 # Cliente server com cookies SSR
│   │
│   ├── constants.ts                  # Constantes globais da aplicação
│   └── utils.ts                      # Funções utilitárias (formatPrice, slugify, etc.)
│
├── types/                            # Interfaces TypeScript
│   ├── product.ts                    # Product, ProductWithCategory
│   ├── order.ts                      # Order, OrderItem, ShippingAddress
│   ├── cart.ts                       # Cart, CartItem
│   └── user.ts                       # Profile, UserRole
│
├── supabase/
│   └── seed.sql                      # Schema completo: tabelas, RLS, funções, índices e seed
│
├── middleware.ts                     # Proteção de rotas /admin, /orders, /checkout
├── tailwind.config.js                # Tema customizado (cores copper, parchment, ink)
├── postcss.config.js                 # PostCSS com Tailwind e Autoprefixer
├── next.config.mjs                   # Configuração Next.js com domínios Supabase
├── tsconfig.json                     # TypeScript com path alias @/*
├── package.json                      # Dependências do projeto
└── .env.example                      # Modelo de variáveis de ambiente
```

---

## Banco de Dados

### Tabelas

| Tabela | Descrição |
|---|---|
| `categories` | Categorias de produtos |
| `products` | Produtos com preço, estoque, imagens e slug |
| `profiles` | Perfil do usuário (extende auth.users) |
| `coupons` | Cupons de desconto (% ou valor fixo) |
| `orders` | Pedidos com endereço e pagamento |
| `order_items` | Itens de cada pedido |

### Funções SQL

| Função | Descrição |
|---|---|
| `handle_new_user()` | Cria perfil automaticamente no cadastro (trigger) |
| `set_updated_at()` | Atualiza `updated_at` automaticamente (trigger) |
| `decrement_stock(product_id, qty)` | Decrementa estoque após pedido confirmado |
| `apply_coupon(code, total)` | Valida e calcula desconto de cupom |

### RLS (Row Level Security)

Todas as tabelas têm RLS ativo. Resumo das políticas:

- **Products:** leitura pública (apenas ativos); escrita apenas para admins
- **Profiles:** cada usuário lê/edita apenas o próprio perfil
- **Orders:** cada usuário vê/cria apenas os próprios pedidos
- **Coupons:** usuários autenticados leem cupons ativos; admins gerenciam tudo

---

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz com base no `.env.example`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=APP_USR-...
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-...
MERCADOPAGO_WEBHOOK_SECRET=sua-chave-secreta

# App
NEXT_PUBLIC_APP_URL=https://atelier-store-eduardo.netlify.app
```

---

## Como Rodar Localmente

### Pré-requisitos
- Node.js 20+
- Conta no [Supabase](https://supabase.com)

### 1. Clone o repositório

```bash
git clone https://github.com/Talduardo/atelier-store.git
cd atelier-store
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Vá em **SQL Editor** e execute o conteúdo de `supabase/seed.sql`
3. Vá em **Storage** → crie um bucket público chamado `products`
4. Em **Settings → API**, copie a URL e a anon key

### 4. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
# Edite .env.local com suas chaves do Supabase
```

### 5. Configure redirecionamento de auth

No Supabase → **Authentication → URL Configuration**:
- **Site URL:** `http://localhost:3000`
- **Redirect URLs:** `http://localhost:3000/auth/confirm`

### 6. Inicie o servidor

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### 7. Torne-se admin

Crie uma conta no site, depois rode no Supabase SQL Editor:

```sql
update profiles
set role = 'admin'
where id = (
  select id from auth.users where email = 'seu@email.com'
);
```

---

## Deploy

### Frontend — Netlify

1. Suba o repositório no GitHub
2. Em [app.netlify.com](https://app.netlify.com) → **Add new site → Import from GitHub**
3. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
4. Adicione as variáveis de ambiente em **Site configuration → Environment variables**
5. Clique em **Deploy site**

### Backend — Supabase

1. Crie o projeto em [supabase.com](https://supabase.com) (região São Paulo)
2. Execute `supabase/seed.sql` no SQL Editor
3. Crie o bucket `products` em **Storage** (public)
4. Configure **Authentication → URL Configuration** com a URL do Netlify

---

## Rotas da Aplicação

| Rota | Descrição | Proteção |
|---|---|---|
| `/` | Home da loja | Pública |
| `/products` | Catálogo com filtros | Pública |
| `/products/[id]` | Detalhe do produto | Pública |
| `/cart` | Carrinho de compras | Pública |
| `/checkout` | Finalizar compra | Login obrigatório |
| `/orders` | Histórico de pedidos | Login obrigatório |
| `/login` | Entrar na conta | Redireciona se logado |
| `/register` | Criar conta | Redireciona se logado |
| `/admin` | Dashboard admin | Admin only |
| `/admin/products` | Gestão de produtos | Admin only |

---

## API Routes

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/ping` | Health check |
| `POST` | `/api/coupon` | Valida e retorna desconto de cupom |
| `GET` | `/auth/confirm` | Callback de OAuth e Magic Link |
| `POST` | `/api/webhooks/stripe` | Webhook de pagamento Stripe |
| `POST` | `/api/webhooks/mercadopago` | Webhook de pagamento Mercado Pago |

### POST `/api/coupon`

```json
// Request
{ "code": "BEMVINDO10", "total": 350.00 }

// Response (sucesso)
{ "discount": 35.00, "code": "BEMVINDO10", "type": "percent", "value": 10 }

// Response (erro)
{ "error": "Cupom inválido ou expirado." }
```

---

## Cupons Disponíveis

| Código | Tipo | Valor | Mínimo |
|---|---|---|---|
| `BEMVINDO10` | Percentual | 10% off | Sem mínimo |
| `FRETE` | Fixo | R$ 29,90 off | Sem mínimo |
| `BLACK20` | Percentual | 20% off | R$ 299,00 |

---

## Painel Administrativo

Acesse `/admin` com uma conta que tenha `role = 'admin'` no banco.

### Dashboard
- **Receita do mês** — soma de todos os pedidos do mês atual
- **Total de pedidos** — contagem de pedidos do mês
- **Ticket médio** — receita ÷ pedidos
- **Clientes novos** — novos cadastros do mês
- **Pedidos recentes** — últimos 5 pedidos com status
- **Estoque baixo** — produtos com 3 ou menos unidades

### Gestão de Produtos (`/admin/products`)
- Listagem completa de todos os produtos (ativos e inativos)
- Indicador visual de estoque (verde/laranja/vermelho)
- Link para edição individual
- Botão para adicionar novo produto

---

## Design System

### Cores

| Variável CSS | Hex | Uso |
|---|---|---|
| `--ink` | `#0e0e0e` | Fundo principal |
| `--parchment` | `#f5f0e8` | Texto principal |
| `--copper` | `#b5692a` | Cor de destaque / CTAs |
| `--copper-light` | `#d4843c` | Hover de elementos copper |
| `--ash` | `#2a2a2a` | Bordas e separadores |
| `--smoke` | `#6b6b6b` | Texto secundário |
| `--fog` | `#d4cfc6` | Texto terciário |

### Tipografia

- **Display / Títulos:** Cormorant Garamond (serif, weight 300–600)
- **Corpo / UI:** DM Sans (sans-serif, weight 300–500)

### Breakpoints

| Nome | Largura |
|---|---|
| Mobile | < 1024px |
| Desktop | ≥ 1024px |

---

## Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Verifica erros de lint
npm run type-check   # Verifica tipos TypeScript sem buildar
```

---

## Licença

Projeto privado — todos os direitos reservados.
