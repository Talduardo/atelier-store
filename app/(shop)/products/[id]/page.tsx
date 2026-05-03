import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Produto ${id} — Atelier Store`,
  }
}

const MOCK_PRODUCT = {
  id: '1',
  name: 'Vaso Cerâmica Nórdico',
  subtitle: 'Feito à mão por artesãos brasileiros',
  price: 289,
  originalPrice: null,
  category: 'Casa',
  sku: 'VCN-001',
  stock: 7,
  isNew: true,
  description: `Vaso em cerâmica de alta temperatura, produzido artesanalmente com argila branca e acabamento fosco. 
Sua forma orgânica e irregular é o que o torna único — cada peça é diferente da outra.

Ideal para flores secas, ramos naturais ou como objeto decorativo isolado. O tom neutro e aveludado combina com qualquer paleta de interiores.`,
  dimensions: '24cm alt. × 14cm diâm.',
  material: 'Cerâmica de alta temperatura',
  origin: 'Brasil — Minas Gerais',
  care: 'Não lavar na máquina. Limpar com pano úmido.',
  images: [null, null, null, null],
  relatedIds: ['2', '3', '4'],
}

const MOCK_RELATED = [
  { id: '2', name: 'Luminária de Mesa Arco', price: 540, originalPrice: 680, category: 'Iluminação' },
  { id: '3', name: 'Cesta Palha Natural', price: 165, originalPrice: null, category: 'Organização' },
  { id: '4', name: 'Espelho Oval Minimal', price: 780, originalPrice: null, category: 'Decoração' },
]

const formatPrice = (price: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)

export default async function ProductDetailPage({ params }: Props) {
  await params // Next.js 15: params is a Promise
  const product = MOCK_PRODUCT
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] text-[#6b6b6b] mb-10">
          <Link href="/" className="hover:text-[#d4843c] transition-colors">Início</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#d4843c] transition-colors">Catálogo</Link>
          <span>/</span>
          <Link href={`/products?categoria=${product.category.toLowerCase()}`} className="hover:text-[#d4843c] transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#d4cfc6]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* ─── Gallery ─── */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="hidden lg:flex flex-col gap-3 w-20 shrink-0">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  className={`
                    aspect-square bg-[#1a1a1a] border transition-all duration-200
                    ${i === 0 ? 'border-[#b5692a]' : 'border-[#2a2a2a] hover:border-[#b5692a]'}
                    flex items-center justify-center
                  `}
                >
                  <div className="w-4 h-4 border border-[#2a2a2a]" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1">
              <div className="relative aspect-[3/4] bg-[#1a1a1a] border border-[#2a2a2a] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 border border-[#2a2a2a] mx-auto mb-3 flex items-center justify-center">
                      <span className="text-[#2a2a2a]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28 }}>A</span>
                    </div>
                    <p className="text-[10px] tracking-widest text-[#3a3a3a] uppercase">Imagem do produto</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.isNew && (
                    <span className="bg-[#b5692a] text-[#f5f0e8] text-[8px] tracking-[0.2em] uppercase px-2.5 py-1">
                      Novo
                    </span>
                  )}
                  {discount && (
                    <span className="bg-[#f5f0e8] text-[#0e0e0e] text-[8px] font-medium px-2.5 py-1">
                      -{discount}%
                    </span>
                  )}
                </div>

                {/* Zoom hint */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-[#0e0e0e]/70 px-2.5 py-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#6b6b6b]">
                    <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[9px] tracking-widest text-[#6b6b6b] uppercase">Ampliar</span>
                </div>

                {/* Nav arrows */}
                {['prev', 'next'].map((dir) => (
                  <button
                    key={dir}
                    className={`
                      absolute top-1/2 -translate-y-1/2
                      ${dir === 'prev' ? 'left-3' : 'right-3'}
                      w-8 h-8 bg-[#0e0e0e]/60 border border-[#2a2a2a]
                      flex items-center justify-center
                      text-[#6b6b6b] hover:text-[#f5f0e8] hover:border-[#b5692a] transition-all
                    `}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d={dir === 'prev' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ))}
              </div>

              {/* Mobile thumbnails */}
              <div className="flex lg:hidden gap-2 mt-3">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    className={`
                      w-14 aspect-square bg-[#1a1a1a] border transition-all
                      ${i === 0 ? 'border-[#b5692a]' : 'border-[#2a2a2a]'}
                    `}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ─── Product Info ─── */}
          <div className="flex flex-col">

            {/* Category + SKU */}
            <div className="flex items-center justify-between mb-4">
              <Link
                href={`/products?categoria=${product.category.toLowerCase()}`}
                className="text-[10px] tracking-[0.25em] uppercase text-[#b5692a] hover:text-[#d4843c] transition-colors"
              >
                {product.category}
              </Link>
              <span className="text-[10px] text-[#6b6b6b]">SKU: {product.sku}</span>
            </div>

            {/* Name */}
            <h1
              className="text-[36px] lg:text-[48px] font-light text-[#f5f0e8] leading-tight mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {product.name}
            </h1>
            <p className="text-[13px] text-[#6b6b6b] italic mb-6">{product.subtitle}</p>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-[#2a2a2a]">
              <span
                className="text-[32px] font-light text-[#d4cfc6]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[18px] text-[#6b6b6b] line-through font-light">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {discount && (
                <span className="text-[12px] font-medium bg-[#b5692a]/20 text-[#d4843c] px-2.5 py-0.5">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Installments note */}
            <p className="text-[11px] text-[#6b6b6b] mb-8">
              ou 3× de {formatPrice(product.price / 3)} sem juros
            </p>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 5 ? 'bg-[#6a9e5a]' : 'bg-[#b5692a]'}`} />
              <span className="text-[11px] text-[#6b6b6b]">
                {product.stock > 5
                  ? 'Em estoque'
                  : `Apenas ${product.stock} unidades restantes`
                }
              </span>
            </div>

            {/* Quantity + CTA */}
            <div className="flex gap-3 mb-4">
              {/* Qty */}
              <div className="flex items-center border border-[#2a2a2a] h-12">
                <button className="w-10 h-full flex items-center justify-center text-[#6b6b6b] hover:text-[#f5f0e8] hover:bg-[#1a1a1a] transition-colors text-lg leading-none">
                  −
                </button>
                <span className="w-10 text-center text-[13px] text-[#d4cfc6]">1</span>
                <button className="w-10 h-full flex items-center justify-center text-[#6b6b6b] hover:text-[#f5f0e8] hover:bg-[#1a1a1a] transition-colors text-lg leading-none">
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button className="
                flex-1 h-12 bg-[#b5692a] text-[#f5f0e8]
                text-[11px] tracking-[0.2em] uppercase font-medium
                hover:bg-[#d4843c] transition-colors duration-200
                flex items-center justify-center gap-2
              ">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round"/>
                </svg>
                Adicionar ao carrinho
              </button>

              {/* Wishlist */}
              <button className="
                w-12 h-12 border border-[#2a2a2a] flex items-center justify-center
                text-[#6b6b6b] hover:border-[#b5692a] hover:text-[#d4843c] transition-all
              ">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Buy now */}
            <button className="
              w-full h-12 border border-[#d4cfc6] text-[#d4cfc6]
              text-[11px] tracking-[0.2em] uppercase
              hover:bg-[#d4cfc6] hover:text-[#0e0e0e] transition-all duration-200 mb-8
            ">
              Comprar agora
            </button>

            {/* Shipping strip */}
            <div className="border border-[#2a2a2a] p-4 mb-8 flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#b5692a] shrink-0">
                <rect x="1" y="3" width="15" height="13" rx="1"/>
                <path d="M16 8h4l3 5v3h-7V8z" strokeLinejoin="round"/>
                <circle cx="5.5" cy="18.5" r="1.5"/>
                <circle cx="18.5" cy="18.5" r="1.5"/>
              </svg>
              <div>
                <p className="text-[11px] text-[#d4cfc6] font-medium">Frete grátis nessa compra</p>
                <p className="text-[11px] text-[#6b6b6b]">Entrega em 3–5 dias úteis • Rastreamento incluso</p>
              </div>
            </div>

            {/* Accordion: Details */}
            <div className="space-y-0 border-t border-[#2a2a2a]">
              {[
                {
                  title: 'Descrição',
                  content: (
                    <p className="text-[13px] text-[#6b6b6b] leading-relaxed whitespace-pre-line">
                      {product.description}
                    </p>
                  ),
                },
                {
                  title: 'Especificações',
                  content: (
                    <table className="w-full text-[12px]">
                      {[
                        ['Dimensões', product.dimensions],
                        ['Material', product.material],
                        ['Origem', product.origin],
                        ['Cuidados', product.care],
                        ['SKU', product.sku],
                      ].map(([k, v]) => (
                        <tr key={k} className="border-b border-[#1a1a1a]">
                          <td className="py-2.5 pr-4 text-[#6b6b6b] w-32 align-top">{k}</td>
                          <td className="py-2.5 text-[#d4cfc6]">{v}</td>
                        </tr>
                      ))}
                    </table>
                  ),
                },
                {
                  title: 'Entrega & Devolução',
                  content: (
                    <div className="text-[13px] text-[#6b6b6b] space-y-2 leading-relaxed">
                      <p>Enviamos para todo o Brasil. Prazo de entrega: 3 a 5 dias úteis.</p>
                      <p>SP e RJ podem receber em até 24h com frete expresso.</p>
                      <p>Aceitamos devoluções em até 30 dias após o recebimento.</p>
                    </div>
                  ),
                },
              ].map(({ title, content }) => (
                <details key={title} className="group border-b border-[#2a2a2a]">
                  <summary className="flex items-center justify-between py-4 cursor-pointer list-none">
                    <span className="text-[11px] tracking-[0.2em] uppercase text-[#d4cfc6]">{title}</span>
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      className="text-[#6b6b6b] transition-transform group-open:rotate-45"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round"/>
                      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round"/>
                    </svg>
                  </summary>
                  <div className="pb-5">{content}</div>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Related Products ─── */}
        <section className="mt-24 pt-12 border-t border-[#2a2a2a]">
          <div className="flex items-end justify-between mb-10">
            <h2
              className="text-[30px] lg:text-[40px] font-light text-[#f5f0e8]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Você também pode gostar
            </h2>
            <Link href="/products" className="hidden lg:flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] hover:text-[#d4843c] transition-colors">
              Ver mais →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {MOCK_RELATED.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group flex flex-col">
                <div className="relative aspect-[3/4] bg-[#1a1a1a] border border-[#2a2a2a] overflow-hidden mb-3 group-hover:border-[#b5692a] transition-colors duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border border-[#2a2a2a]" />
                  </div>
                </div>
                <p className="text-[8px] tracking-[0.2em] uppercase text-[#b5692a] mb-0.5">{p.category}</p>
                <p className="text-[15px] text-[#f5f0e8] font-light group-hover:text-[#d4843c] transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {p.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[13px] text-[#d4cfc6]">{formatPrice(p.price)}</span>
                  {p.originalPrice && <span className="text-[11px] text-[#6b6b6b] line-through">{formatPrice(p.originalPrice)}</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}