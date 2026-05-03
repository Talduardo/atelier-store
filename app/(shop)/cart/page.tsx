import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Carrinho' }

const MOCK_CART = [
  { id: '1', name: 'Vaso Cerâmica Nórdico', category: 'Casa', price: 289, qty: 1, sku: 'VCN-001' },
  { id: '2', name: 'Luminária de Mesa Arco', category: 'Iluminação', price: 540, qty: 2, sku: 'LMA-002' },
]

const formatPrice = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

export default function CartPage() {
  const subtotal = MOCK_CART.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = subtotal >= 299 ? 0 : 29.9
  const total = subtotal + shipping

  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-14">

        {/* Header */}
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-[11px] text-[#6b6b6b] mb-4">
            <Link href="/" className="hover:text-[#d4843c] transition-colors">Início</Link>
            <span>/</span>
            <span className="text-[#d4cfc6]">Carrinho</span>
          </nav>
          <div className="flex items-end justify-between">
            <h1
              className="text-[40px] lg:text-[52px] font-light text-[#f5f0e8]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Carrinho
            </h1>
            <span className="text-[12px] text-[#6b6b6b] mb-2">
              {MOCK_CART.length} {MOCK_CART.length === 1 ? 'item' : 'itens'}
            </span>
          </div>
        </div>

        {MOCK_CART.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 border border-[#2a2a2a] flex items-center justify-center mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#2a2a2a]">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-[#6b6b6b] text-[14px] mb-6">Seu carrinho está vazio</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 h-11 px-8 bg-[#b5692a] text-[#f5f0e8] text-[11px] tracking-[0.2em] uppercase hover:bg-[#d4843c] transition-colors"
            >
              Explorar produtos
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">

            {/* ─── Items ─── */}
            <div>
              <div className="hidden lg:grid grid-cols-[1fr_120px_120px_48px] gap-4 pb-3 border-b border-[#2a2a2a] mb-1">
                {['Produto', 'Quantidade', 'Preço', ''].map((h) => (
                  <span key={h} className="text-[9px] tracking-[0.25em] uppercase text-[#6b6b6b]">{h}</span>
                ))}
              </div>

              <div className="divide-y divide-[#2a2a2a]">
                {MOCK_CART.map((item) => (
                  <div key={item.id} className="py-6 grid lg:grid-cols-[1fr_120px_120px_48px] gap-4 lg:gap-4 items-center">

                    {/* Product */}
                    <div className="flex gap-4 items-start">
                      <Link href={`/products/${item.id}`}>
                        <div className="w-20 aspect-square bg-[#1a1a1a] border border-[#2a2a2a] shrink-0 flex items-center justify-center hover:border-[#b5692a] transition-colors">
                          <div className="w-6 h-6 border border-[#2a2a2a]" />
                        </div>
                      </Link>
                      <div>
                        <p className="text-[9px] tracking-[0.2em] uppercase text-[#b5692a] mb-1">{item.category}</p>
                        <Link href={`/products/${item.id}`}>
                          <p
                            className="text-[16px] text-[#f5f0e8] font-light hover:text-[#d4843c] transition-colors"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                          >
                            {item.name}
                          </p>
                        </Link>
                        <p className="text-[10px] text-[#6b6b6b] mt-0.5">SKU: {item.sku}</p>
                        {/* Mobile price */}
                        <p className="lg:hidden text-[14px] text-[#d4cfc6] mt-2">{formatPrice(item.price * item.qty)}</p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center border border-[#2a2a2a] h-9 w-28">
                      <button className="w-9 h-full flex items-center justify-center text-[#6b6b6b] hover:text-[#f5f0e8] hover:bg-[#1a1a1a] transition-colors">
                        −
                      </button>
                      <span className="flex-1 text-center text-[13px] text-[#d4cfc6]">{item.qty}</span>
                      <button className="w-9 h-full flex items-center justify-center text-[#6b6b6b] hover:text-[#f5f0e8] hover:bg-[#1a1a1a] transition-colors">
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="hidden lg:block">
                      <p className="text-[15px] text-[#d4cfc6]">{formatPrice(item.price * item.qty)}</p>
                      {item.qty > 1 && (
                        <p className="text-[11px] text-[#6b6b6b]">{formatPrice(item.price)} cada</p>
                      )}
                    </div>

                    {/* Remove */}
                    <button className="text-[#6b6b6b] hover:text-[#f5f0e8] transition-colors justify-self-end lg:justify-self-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Continue shopping */}
              <div className="mt-6 pt-6 border-t border-[#2a2a2a]">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] hover:text-[#d4843c] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Continuar comprando
                </Link>
              </div>
            </div>

            {/* ─── Order Summary ─── */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 lg:p-8 sticky top-24">
              <h2
                className="text-[22px] font-light text-[#f5f0e8] mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Resumo do pedido
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#6b6b6b]">Subtotal</span>
                  <span className="text-[#d4cfc6]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#6b6b6b]">Frete</span>
                  <span className={shipping === 0 ? 'text-[#6a9e5a] text-[12px]' : 'text-[#d4cfc6]'}>
                    {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-[10px] text-[#6b6b6b] bg-[#6a9e5a]/10 border border-[#6a9e5a]/20 px-3 py-2">
                    ✓ Frete grátis aplicado (compras acima de R$ 299)
                  </p>
                )}
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Código de cupom"
                  className="
                    flex-1 h-9 bg-[#0e0e0e] border border-[#2a2a2a] px-3
                    text-[12px] text-[#f5f0e8] placeholder-[#3a3a3a]
                    focus:outline-none focus:border-[#b5692a] transition-colors
                  "
                />
                <button className="h-9 px-4 border border-[#2a2a2a] text-[10px] tracking-[0.15em] uppercase text-[#6b6b6b] hover:border-[#b5692a] hover:text-[#d4843c] transition-all">
                  Aplicar
                </button>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline pt-5 border-t border-[#2a2a2a] mb-6">
                <span className="text-[12px] tracking-[0.1em] uppercase text-[#d4cfc6]">Total</span>
                <div className="text-right">
                  <p className="text-[24px] font-light text-[#f5f0e8]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {formatPrice(total)}
                  </p>
                  <p className="text-[10px] text-[#6b6b6b]">
                    ou 3× de {formatPrice(total / 3)} sem juros
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/checkout"
                className="
                  w-full h-12 bg-[#b5692a] text-[#f5f0e8] flex items-center justify-center
                  text-[11px] tracking-[0.2em] uppercase font-medium
                  hover:bg-[#d4843c] transition-colors duration-200 mb-3
                "
              >
                Finalizar compra →
              </Link>
              <button className="
                w-full h-11 border border-[#2a2a2a] text-[#6b6b6b]
                text-[11px] tracking-[0.2em] uppercase
                hover:border-[#b5692a] hover:text-[#f5f0e8] transition-all
                flex items-center justify-center gap-2
              ">
                <span className="text-[14px]">P</span> Pagar com Pix
              </button>

              {/* Trust */}
              <div className="flex items-center justify-center gap-4 mt-5 pt-5 border-t border-[#2a2a2a]">
                {['SSL Seguro', 'Dados criptografados'].map((t) => (
                  <div key={t} className="flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#b5692a]">
                      <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[9px] text-[#6b6b6b]">{t}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
