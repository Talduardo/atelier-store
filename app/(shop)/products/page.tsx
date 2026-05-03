import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catálogo de Produtos',
}

const MOCK_PRODUCTS = [
  { id: '1', name: 'Vaso Cerâmica Nórdico', price: 289, originalPrice: null, category: 'Casa', isNew: true },
  { id: '2', name: 'Luminária de Mesa Arco', price: 540, originalPrice: 680, category: 'Iluminação', isNew: false },
  { id: '3', name: 'Cesta Palha Natural', price: 165, originalPrice: null, category: 'Organização', isNew: true },
  { id: '4', name: 'Espelho Oval Minimal', price: 780, originalPrice: null, category: 'Decoração', isNew: false },
  { id: '5', name: 'Porta-Livros Ferro', price: 320, originalPrice: 390, category: 'Organização', isNew: false },
  { id: '6', name: 'Tapete Berber Bege', price: 890, originalPrice: null, category: 'Têxtil', isNew: true },
  { id: '7', name: 'Bandeja Travertino', price: 420, originalPrice: null, category: 'Casa', isNew: false },
  { id: '8', name: 'Almofada Bouclé Off-White', price: 195, originalPrice: 240, category: 'Têxtil', isNew: true },
  { id: '9', name: 'Bowl Cerâmica Mate', price: 145, originalPrice: null, category: 'Casa', isNew: false },
  { id: '10', name: 'Pendente Rattan Aberto', price: 680, originalPrice: null, category: 'Iluminação', isNew: true },
  { id: '11', name: 'Organizador Bambu 3P', price: 210, originalPrice: null, category: 'Organização', isNew: false },
  { id: '12', name: 'Quadro Abstrato P&B', price: 450, originalPrice: 560, category: 'Decoração', isNew: false },
]

const CATEGORIES = ['Todos', 'Casa', 'Iluminação', 'Têxtil', 'Organização', 'Decoração']
const SORT_OPTIONS = ['Relevância', 'Menor preço', 'Maior preço', 'Mais novos', 'Mais vendidos']

const formatPrice = (price: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; ordem?: string; q?: string }>
}) {
  const { categoria, ordem, q } = await searchParams
  const activeCategory = categoria || 'todos'
  const activeSort = ordem || 'Relevância'

  const filtered = activeCategory && activeCategory !== 'todos'
    ? MOCK_PRODUCTS.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase())
    : MOCK_PRODUCTS

  return (
    <div className="pt-20 lg:pt-24 min-h-screen">

      {/* Page header */}
      <div className="border-b border-[#2a2a2a]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
            <div>
              <nav className="flex items-center gap-2 text-[11px] text-[#6b6b6b] mb-4">
                <Link href="/" className="hover:text-[#d4843c] transition-colors">Início</Link>
                <span>/</span>
                <span className="text-[#d4cfc6]">Catálogo</span>
              </nav>
              <h1
                className="text-[40px] lg:text-[56px] font-light text-[#f5f0e8]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Catálogo
              </h1>
              <p className="text-[12px] text-[#6b6b6b] mt-1">
                {filtered.length} produto{filtered.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-72">
              <input
                type="search"
                placeholder="Buscar produtos…"
                defaultValue={q}
                className="
                  w-full h-10 bg-[#1a1a1a] border border-[#2a2a2a] pl-9 pr-4
                  text-[12px] text-[#f5f0e8] placeholder-[#6b6b6b]
                  focus:outline-none focus:border-[#b5692a] transition-colors
                "
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6b6b]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7"/>
                <path d="m21 21-4.35-4.35" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ─── Sidebar Filters ─── */}
          <aside className="lg:w-56 shrink-0">
            <div className="sticky top-24">

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-[10px] tracking-[0.25em] uppercase text-[#b5692a] mb-4 font-medium">
                  Categorias
                </h3>
                <ul className="space-y-1">
                  {CATEGORIES.map((cat) => {
                    const slug = cat.toLowerCase() === 'todos' ? '' : cat.toLowerCase()
                    const isActive = activeCategory === slug || (cat === 'Todos' && !activeCategory)
                    return (
                      <li key={cat}>
                        <Link
                          href={slug ? `/products?categoria=${slug}` : '/products'}
                          className={`
                            flex items-center justify-between py-1.5 text-[13px] transition-colors
                            ${isActive
                              ? 'text-[#d4843c]'
                              : 'text-[#6b6b6b] hover:text-[#f5f0e8]'
                            }
                          `}
                        >
                          {cat}
                          {isActive && <div className="w-1 h-1 bg-[#b5692a] rounded-full" />}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Price range */}
              <div className="mb-8">
                <h3 className="text-[10px] tracking-[0.25em] uppercase text-[#b5692a] mb-4 font-medium">
                  Preço
                </h3>
                <div className="space-y-2">
                  {[
                    { label: 'Até R$ 200', slug: '0-200' },
                    { label: 'R$ 200 – R$ 500', slug: '200-500' },
                    { label: 'R$ 500 – R$ 1.000', slug: '500-1000' },
                    { label: 'Acima de R$ 1.000', slug: '1000+' },
                  ].map(({ label }) => (
                    <label key={label} className="flex items-center gap-2.5 cursor-pointer group">
                      <div className="w-3.5 h-3.5 border border-[#2a2a2a] group-hover:border-[#b5692a] transition-colors" />
                      <span className="text-[12px] text-[#6b6b6b] group-hover:text-[#d4cfc6] transition-colors">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* On sale */}
              <div>
                <h3 className="text-[10px] tracking-[0.25em] uppercase text-[#b5692a] mb-4 font-medium">
                  Filtros
                </h3>
                <div className="space-y-2">
                  {['Novidades', 'Em promoção', 'Frete grátis'].map((f) => (
                    <label key={f} className="flex items-center gap-2.5 cursor-pointer group">
                      <div className="w-3.5 h-3.5 border border-[#2a2a2a] group-hover:border-[#b5692a] transition-colors" />
                      <span className="text-[12px] text-[#6b6b6b] group-hover:text-[#d4cfc6] transition-colors">
                        {f}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ─── Products Grid ─── */}
          <div className="flex-1 min-w-0">

            {/* Sort bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2a2a2a]">
              <p className="text-[12px] text-[#6b6b6b]">
                Mostrando <span className="text-[#d4cfc6]">{filtered.length}</span> produtos
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#6b6b6b]">Ordenar:</span>
                <select
                  defaultValue={activeSort}
                  className="
                    bg-[#1a1a1a] border border-[#2a2a2a] text-[#d4cfc6]
                    text-[11px] h-8 px-3 focus:outline-none focus:border-[#b5692a]
                    appearance-none cursor-pointer
                  "
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>

                {/* View toggle */}
                <div className="flex border border-[#2a2a2a]">
                  {[4, 3].map((cols) => (
                    <button
                      key={cols}
                      className={`w-8 h-8 flex items-center justify-center text-[#6b6b6b] hover:text-[#f5f0e8] hover:bg-[#1a1a1a] transition-colors`}
                    >
                      <GridIcon cols={cols} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {filtered.map((product) => {
                const discount = product.originalPrice
                  ? Math.round((1 - product.price / product.originalPrice) * 100)
                  : null

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group flex flex-col"
                  >
                    <div className="relative aspect-[3/4] bg-[#1a1a1a] border border-[#2a2a2a] overflow-hidden mb-3 group-hover:border-[#b5692a] transition-colors duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 border border-[#2a2a2a]" />
                      </div>

                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                        {product.isNew && (
                          <span className="bg-[#b5692a] text-[#f5f0e8] text-[7px] tracking-[0.2em] uppercase px-2 py-0.5">
                            Novo
                          </span>
                        )}
                        {discount && (
                          <span className="bg-[#f5f0e8] text-[#0e0e0e] text-[7px] tracking-widest px-2 py-0.5 font-medium">
                            -{discount}%
                          </span>
                        )}
                      </div>

                      {/* Quick add overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-[#0e0e0e]/90 py-2.5 px-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button className="w-full text-[9px] tracking-[0.2em] uppercase text-[#f5f0e8] hover:text-[#d4843c] transition-colors">
                          + Carrinho
                        </button>
                      </div>
                    </div>

                    <p className="text-[8px] tracking-[0.2em] uppercase text-[#b5692a] mb-0.5">
                      {product.category}
                    </p>
                    <p
                      className="text-[14px] text-[#f5f0e8] font-light leading-snug group-hover:text-[#d4843c] transition-colors mb-1"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {product.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-[#d4cfc6]">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-[11px] text-[#6b6b6b] line-through">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-14">
              {[1, 2, 3, '...', 8].map((page, i) => (
                <button
                  key={i}
                  className={`
                    w-9 h-9 text-[12px] border transition-colors
                    ${page === 1
                      ? 'border-[#b5692a] text-[#d4843c] bg-[#b5692a]/10'
                      : 'border-[#2a2a2a] text-[#6b6b6b] hover:border-[#b5692a] hover:text-[#d4843c]'
                    }
                  `}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GridIcon({ cols }: { cols: number }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      {cols === 4
        ? <>
            <rect x="0" y="0" width="3" height="3" rx="0.5" />
            <rect x="4.3" y="0" width="3" height="3" rx="0.5" />
            <rect x="8.6" y="0" width="3" height="3" rx="0.5" />
            <rect x="13" y="0" width="3" height="3" rx="0.5" />
            <rect x="0" y="4.3" width="3" height="3" rx="0.5" />
            <rect x="4.3" y="4.3" width="3" height="3" rx="0.5" />
            <rect x="8.6" y="4.3" width="3" height="3" rx="0.5" />
            <rect x="13" y="4.3" width="3" height="3" rx="0.5" />
          </>
        : <>
            <rect x="0" y="0" width="4" height="4" rx="0.5" />
            <rect x="6" y="0" width="4" height="4" rx="0.5" />
            <rect x="12" y="0" width="4" height="4" rx="0.5" />
            <rect x="0" y="6" width="4" height="4" rx="0.5" />
            <rect x="6" y="6" width="4" height="4" rx="0.5" />
            <rect x="12" y="6" width="4" height="4" rx="0.5" />
          </>
      }
    </svg>
  )
}