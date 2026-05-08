'use client'

import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/lib/utils'
import { useState } from 'react'

export default function CartPage() {
  const { cart, itemCount, updateQuantity, removeItem, applyCoupon, mounted } = useCart()
  const [couponInput, setCouponInput] = useState('')
  const [couponLoading, setCouponLoading] = useState(false)
  const [couponMsg, setCouponMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  if (!mounted) {
    return (
      <div className="pt-20 lg:pt-24 min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border border-[#b5692a] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  async function handleCoupon() {
    if (!couponInput.trim()) return
    setCouponLoading(true)
    setCouponMsg(null)
    try {
      const res = await fetch('/api/coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput.toUpperCase(), total: cart.subtotal }),
      })
      const data = await res.json()
      if (data.error) {
        setCouponMsg({ type: 'error', text: data.error })
      } else {
        applyCoupon(data.code, data.discount)
        setCouponMsg({ type: 'success', text: `Cupom aplicado! -${formatPrice(data.discount)}` })
      }
    } catch {
      setCouponMsg({ type: 'error', text: 'Erro ao aplicar cupom.' })
    } finally {
      setCouponLoading(false)
    }
  }

  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-14">
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-[11px] text-[#6b6b6b] mb-4">
            <Link href="/" className="hover:text-[#d4843c] transition-colors">Início</Link>
            <span>/</span>
            <span className="text-[#d4cfc6]">Carrinho</span>
          </nav>
          <div className="flex items-end justify-between">
            <h1 className="text-[40px] lg:text-[52px] font-light text-[#f5f0e8]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>Carrinho</h1>
            <span className="text-[12px] text-[#6b6b6b] mb-2">{itemCount} {itemCount === 1 ? 'item' : 'itens'}</span>
          </div>
        </div>

        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 border border-[#2a2a2a] flex items-center justify-center mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#2a2a2a]">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-[#6b6b6b] mb-6 text-[14px]">Seu carrinho está vazio</p>
            <Link href="/products" className="inline-flex items-center h-11 px-8 bg-[#b5692a] text-[#f5f0e8] text-[11px] tracking-[0.2em] uppercase hover:bg-[#d4843c] transition-colors">
              Explorar produtos
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">
            <div>
              <div className="divide-y divide-[#2a2a2a]">
                {cart.items.map((item) => (
                  <div key={item.id} className="py-6 grid lg:grid-cols-[1fr_120px_120px_48px] gap-4 items-center">
                    <div className="flex gap-4 items-start">
                      <Link href={`/products/${item.slug}`}>
                        <div className="w-20 aspect-square bg-[#1a1a1a] border border-[#2a2a2a] shrink-0 overflow-hidden flex items-center justify-center hover:border-[#b5692a] transition-colors">
                          {item.image_url
                            ? <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                            : <div className="w-6 h-6 border border-[#2a2a2a]" />}
                        </div>
                      </Link>
                      <div>
                        <Link href={`/products/${item.slug}`}>
                          <p className="text-[16px] text-[#f5f0e8] font-light hover:text-[#d4843c] transition-colors"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}>{item.name}</p>
                        </Link>
                        <p className="text-[10px] text-[#6b6b6b] mt-0.5">SKU: {item.sku}</p>
                        <p className="lg:hidden text-[14px] text-[#d4cfc6] mt-2">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                    <div className="flex items-center border border-[#2a2a2a] h-9 w-28">
                      <button onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        className="w-9 h-full flex items-center justify-center text-[#6b6b6b] hover:text-[#f5f0e8] hover:bg-[#1a1a1a] transition-colors">−</button>
                      <span className="flex-1 text-center text-[13px] text-[#d4cfc6]">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        className="w-9 h-full flex items-center justify-center text-[#6b6b6b] hover:text-[#f5f0e8] hover:bg-[#1a1a1a] transition-colors">+</button>
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-[15px] text-[#d4cfc6]">{formatPrice(item.price * item.quantity)}</p>
                      {item.quantity > 1 && <p className="text-[11px] text-[#6b6b6b]">{formatPrice(item.price)} cada</p>}
                    </div>
                    <button onClick={() => removeItem(item.product_id)}
                      className="text-[#6b6b6b] hover:text-[#f5f0e8] transition-colors justify-self-end lg:justify-self-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-[#2a2a2a]">
                <Link href="/products" className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] hover:text-[#d4843c] transition-colors">
                  ← Continuar comprando
                </Link>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 lg:p-8 sticky top-24">
              <h2 className="text-[22px] font-light text-[#f5f0e8] mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>Resumo do pedido</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#6b6b6b]">Subtotal</span>
                  <span className="text-[#d4cfc6]">{formatPrice(cart.subtotal)}</span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#6b6b6b]">Desconto ({cart.coupon_code})</span>
                    <span className="text-[#6a9e5a]">-{formatPrice(cart.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#6b6b6b]">Frete</span>
                  <span className={cart.shipping_cost === 0 ? 'text-[#6a9e5a]' : 'text-[#d4cfc6]'}>
                    {cart.shipping_cost === 0 ? 'Grátis' : formatPrice(cart.shipping_cost)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mb-2">
                <input type="text" placeholder="Código de cupom" value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 h-9 bg-[#0e0e0e] border border-[#2a2a2a] px-3 text-[12px] text-[#f5f0e8] placeholder-[#3a3a3a] focus:outline-none focus:border-[#b5692a] transition-colors" />
                <button onClick={handleCoupon} disabled={couponLoading}
                  className="h-9 px-4 border border-[#2a2a2a] text-[10px] uppercase text-[#6b6b6b] hover:border-[#b5692a] hover:text-[#d4843c] transition-all disabled:opacity-50">
                  {couponLoading ? '...' : 'Aplicar'}
                </button>
              </div>
              {couponMsg && (
                <p className={`text-[11px] mb-4 ${couponMsg.type === 'success' ? 'text-[#6a9e5a]' : 'text-[#e24b4a]'}`}>
                  {couponMsg.text}
                </p>
              )}

              <div className="flex justify-between items-baseline pt-5 border-t border-[#2a2a2a] mb-6">
                <span className="text-[12px] uppercase text-[#d4cfc6]">Total</span>
                <div className="text-right">
                  <p className="text-[24px] font-light text-[#f5f0e8]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>{formatPrice(cart.total)}</p>
                  <p className="text-[10px] text-[#6b6b6b]">ou 3× de {formatPrice(cart.total / 3)} sem juros</p>
                </div>
              </div>

              <Link href="/checkout"
                className="w-full h-12 bg-[#b5692a] text-[#f5f0e8] flex items-center justify-center text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#d4843c] transition-colors mb-3">
                Finalizar compra →
              </Link>
              <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-[#2a2a2a]">
                <span className="text-[9px] text-[#6b6b6b]">🔒 Compra 100% segura</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
