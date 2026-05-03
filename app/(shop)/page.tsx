import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Atelier Store — Curated Living',
}

// Mock data - will be replaced by Supabase queries
const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Vaso Cerâmica Nórdico',
    price: 289,
    originalPrice: null,
    image: null,
    category: 'Casa',
    isNew: true,
  },
  {
    id: '2',
    name: 'Luminária de Mesa Arco',
    price: 540,
    originalPrice: 680,
    image: null,
    category: 'Iluminação',
    isNew: false,
  },
  {
    id: '3',
    name: 'Cesta Palha Natural',
    price: 165,
    originalPrice: null,
    image: null,
    category: 'Organização',
    isNew: true,
  },
  {
    id: '4',
    name: 'Espelho Oval Minimal',
    price: 780,
    originalPrice: null,
    image: null,
    category: 'Decoração',
    isNew: false,
  },
]

const CATEGORIES = [
  { name: 'Casa & Décor', count: 48, slug: 'casa' },
  { name: 'Iluminação', count: 24, slug: 'iluminacao' },
  { name: 'Têxtil', count: 36, slug: 'textil' },
  { name: 'Organização', count: 19, slug: 'organizacao' },
]

const formatPrice = (price: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)

export default function HomePage() {
  return (
    <div className="overflow-hidden">

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-end pb-16 lg:pb-24">

        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 79px,
                #f5f0e8 79px,
                #f5f0e8 80px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 79px,
                #f5f0e8 79px,
                #f5f0e8 80px
              )`
            }}
          />
          {/* Copper glow */}
          <div className="absolute top-1/4 right-[10%] w-[600px] h-[600px] rounded-full bg-[#b5692a] opacity-[0.06] blur-[120px]" />
          <div className="absolute bottom-0 left-[20%] w-[400px] h-[400px] rounded-full bg-[#d4843c] opacity-[0.04] blur-[100px]" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-end">

            {/* Copy */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-[#b5692a]" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#b5692a]">
                  Nova Coleção 2025
                </span>
              </div>
              <h1
                className="text-[clamp(52px,7vw,96px)] font-light leading-[0.92] text-[#f5f0e8] mb-8"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Objetos que
                <br />
                <em className="italic text-[#d4843c]">definem</em>
                <br />
                ambientes.
              </h1>
              <p className="text-[14px] text-[#6b6b6b] leading-relaxed max-w-sm mb-10">
                Peças selecionadas para quem valoriza qualidade, estética e funcionalidade no dia a dia.
              </p>
              <div className="flex flex-wrap items-center gap-5">
                <Link
                  href="/products"
                  className="
                    inline-flex items-center gap-3 h-12 px-8
                    bg-[#b5692a] text-[#f5f0e8] text-[11px] tracking-[0.2em] uppercase
                    hover:bg-[#d4843c] transition-colors duration-200
                  "
                >
                  Explorar catálogo
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/products?categoria=novidades"
                  className="
                    inline-flex items-center gap-2 h-12 px-8
                    border border-[#2a2a2a] text-[#d4cfc6] text-[11px] tracking-[0.2em] uppercase
                    hover:border-[#b5692a] hover:text-[#f5f0e8] transition-all duration-200
                  "
                >
                  Ver novidades
                </Link>
              </div>
            </div>

            {/* Floating product card */}
            <div className="hidden lg:block relative">
              <div className="ml-auto w-[420px] relative">
                {/* Main card */}
                <div className="aspect-[3/4] bg-[#1a1a1a] border border-[#2a2a2a] relative overflow-hidden">
                  {/* Product image placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 border border-[#2a2a2a] mx-auto mb-4 flex items-center justify-center">
                        <span className="text-[#2a2a2a]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32 }}>A</span>
                      </div>
                      <span className="text-[10px] tracking-widest text-[#3a3a3a] uppercase">Imagem do produto</span>
                    </div>
                  </div>
                  {/* Tag */}
                  <div className="absolute top-5 left-5 bg-[#b5692a] px-3 py-1">
                    <span className="text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]">Novo</span>
                  </div>
                  {/* Price overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#0e0e0e] to-transparent">
                    <p className="text-[11px] tracking-[0.15em] text-[#b5692a] uppercase mb-1">Casa & Décor</p>
                    <p className="text-[17px] text-[#f5f0e8] font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      Vaso Cerâmica Nórdico
                    </p>
                    <p className="text-[15px] text-[#d4cfc6] mt-1">R$ 289,00</p>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -right-8 top-1/3 bg-[#f5f0e8] text-[#0e0e0e] px-5 py-4 shadow-2xl">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-[#6b6b6b]">Frete grátis</p>
                  <p className="text-[12px] font-medium mt-0.5">acima de R$ 299</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-0 left-6 lg:left-12 flex flex-col items-center gap-2 pb-6">
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#3a3a3a] [writing-mode:vertical-lr]">
              Rolar
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-[#3a3a3a] to-transparent" />
          </div>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          {/* Section header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="block text-[10px] tracking-[0.3em] uppercase text-[#b5692a] mb-3">
                Navegue por
              </span>
              <h2
                className="text-[36px] lg:text-[48px] font-light text-[#f5f0e8]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Categorias
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden lg:flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] hover:text-[#d4843c] transition-colors"
            >
              Ver todos <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map(({ name, count, slug }) => (
              <Link
                key={slug}
                href={`/products?categoria=${slug}`}
                className="
                  group relative aspect-square bg-[#1a1a1a] border border-[#2a2a2a]
                  hover:border-[#b5692a] transition-all duration-300 overflow-hidden
                  flex flex-col justify-end p-6
                "
              >
                {/* Background accent */}
                <div className="absolute top-4 right-4 w-16 h-16 border border-[#2a2a2a] group-hover:border-[#b5692a] group-hover:scale-110 transition-all duration-500" />
                <div className="absolute top-8 right-8 w-8 h-8 bg-[#b5692a] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#b5692a] mb-2">
                    {count} itens
                  </p>
                  <p
                    className="text-[20px] text-[#f5f0e8] font-light group-hover:text-[#d4843c] transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {name}
                  </p>
                </div>

                <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowRight size={16} className="text-[#b5692a]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Products ─── */}
      <section className="py-20 lg:py-28 border-t border-[#2a2a2a]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="block text-[10px] tracking-[0.3em] uppercase text-[#b5692a] mb-3">
                Seleção
              </span>
              <h2
                className="text-[36px] lg:text-[48px] font-light text-[#f5f0e8]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Em destaque
              </h2>
            </div>
            <Link
              href="/products?categoria=destaque"
              className="hidden lg:flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] hover:text-[#d4843c] transition-colors"
            >
              Ver todos <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {FEATURED_PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Editorial Banner ─── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-10 lg:p-16 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
              <div className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #f5f0e8 0px, #f5f0e8 1px, transparent 1px, transparent 30px)'
                }}
              />
            </div>
            <div className="relative max-w-xl">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#b5692a] mb-4 block">
                Entrega expressa
              </span>
              <h2
                className="text-[36px] lg:text-[52px] font-light text-[#f5f0e8] leading-tight mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Chegue em casa
                <br />
                <em className="italic text-[#d4843c]">em até 24h</em>
                <br />
                em SP e RJ.
              </h2>
              <p className="text-[13px] text-[#6b6b6b] leading-relaxed mb-8 max-w-sm">
                Para outras regiões, entregamos em até 5 dias úteis. Frete grátis para compras acima de R$ 299,00.
              </p>
              <Link
                href="/shipping"
                className="
                  inline-flex items-center gap-3
                  text-[11px] tracking-[0.2em] uppercase text-[#f5f0e8]
                  border-b border-[#b5692a] pb-1
                  hover:text-[#d4843c] transition-colors
                "
              >
                Saiba mais sobre entregas <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust strip ─── */}
      <section className="border-y border-[#2a2a2a] py-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-[#2a2a2a]">
            {[
              { label: 'Entrega rápida', desc: 'SP e RJ em 24h' },
              { label: 'Pagamento seguro', desc: 'Stripe + Mercado Pago' },
              { label: 'Frete grátis', desc: 'Compras acima de R$ 299' },
              { label: 'Troca fácil', desc: '30 dias para trocar' },
            ].map(({ label, desc }) => (
              <div key={label} className="text-center lg:px-8">
                <p className="text-[12px] font-medium text-[#d4cfc6] tracking-wide mb-1">{label}</p>
                <p className="text-[11px] text-[#6b6b6b]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

// ─── ProductCard ─────────────────────────────────────────────────────────────
interface Product {
  id: string
  name: string
  price: number
  originalPrice: number | null
  image: string | null
  category: string
  isNew: boolean
}

function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] bg-[#1a1a1a] border border-[#2a2a2a] overflow-hidden mb-3 group-hover:border-[#b5692a] transition-colors duration-300">

        {/* Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border border-[#2a2a2a]" />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-[#b5692a] text-[#f5f0e8] text-[8px] tracking-[0.2em] uppercase px-2 py-0.5">
              Novo
            </span>
          )}
          {discount && (
            <span className="bg-[#f5f0e8] text-[#0e0e0e] text-[8px] tracking-[0.1em] px-2 py-0.5 font-medium">
              −{discount}%
            </span>
          )}
        </div>

        {/* Quick add */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0e0e0e]/90 py-3 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full text-[10px] tracking-[0.2em] uppercase text-[#f5f0e8] hover:text-[#d4843c] transition-colors">
            Adicionar ao carrinho
          </button>
        </div>
      </div>

      {/* Info */}
      <div>
        <p className="text-[9px] tracking-[0.2em] uppercase text-[#b5692a] mb-1">{product.category}</p>
        <p
          className="text-[15px] text-[#f5f0e8] font-light leading-snug group-hover:text-[#d4843c] transition-colors"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {product.name}
        </p>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-[14px] text-[#d4cfc6]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[12px] text-[#6b6b6b] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

// ─── Icons ───────────────────────────────────────────────────────────────────
function ArrowRight({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
