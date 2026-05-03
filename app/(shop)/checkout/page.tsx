'use client'

import { useState } from 'react'
import Link from 'next/link'

const STEPS = ['Endereço', 'Entrega', 'Pagamento', 'Revisão']

const MOCK_CART = [
  { id: '1', name: 'Vaso Cerâmica Nórdico', price: 289, qty: 1 },
  { id: '2', name: 'Luminária de Mesa Arco', price: 540, qty: 2 },
]

const formatPrice = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

export default function CheckoutPage() {
  const [step, setStep] = useState(0)
  const [payMethod, setPayMethod] = useState<'card' | 'pix' | 'boleto'>('card')

  const subtotal = MOCK_CART.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = 0
  const total = subtotal + shipping

  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-10 lg:py-14">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="group flex flex-col leading-none">
            <span className="text-[18px] tracking-[0.2em] font-light text-[#f5f0e8]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>ATELIER</span>
            <span className="text-[8px] tracking-[0.4em] text-[#b5692a] mt-[-2px]">STORE</span>
          </Link>
          <Link href="/cart" className="text-[11px] text-[#6b6b6b] hover:text-[#d4843c] transition-colors tracking-wide">
            ← Voltar ao carrinho
          </Link>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-0 mb-12">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => i < step && setStep(i)}
                className="flex items-center gap-2.5 group"
              >
                <div className={`
                  w-7 h-7 flex items-center justify-center text-[11px] font-medium transition-all
                  ${i < step
                    ? 'bg-[#b5692a] text-[#f5f0e8]'
                    : i === step
                      ? 'border-2 border-[#b5692a] text-[#d4843c]'
                      : 'border border-[#2a2a2a] text-[#3a3a3a]'
                  }
                `}>
                  {i < step
                    ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : i + 1
                  }
                </div>
                <span className={`text-[11px] tracking-[0.1em] hidden lg:block ${
                  i === step ? 'text-[#d4843c]' : i < step ? 'text-[#6b6b6b]' : 'text-[#3a3a3a]'
                }`}>
                  {s}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-3 lg:mx-4 transition-colors ${i < step ? 'bg-[#b5692a]' : 'bg-[#2a2a2a]'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">

          {/* ─── Form Area ─── */}
          <div>
            {/* Step 0: Address */}
            {step === 0 && (
              <div>
                <h2 className="text-[26px] font-light text-[#f5f0e8] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Endereço de entrega
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {[
                    { label: 'Nome', span: 1 },
                    { label: 'Sobrenome', span: 1 },
                    { label: 'E-mail', span: 2 },
                    { label: 'Telefone', span: 2 },
                    { label: 'CEP', span: 1 },
                    { label: 'Cidade', span: 1 },
                    { label: 'Rua', span: 2 },
                    { label: 'Número', span: 1 },
                    { label: 'Complemento', span: 1 },
                    { label: 'Bairro', span: 1 },
                    { label: 'Estado', span: 1 },
                  ].map(({ label, span }) => (
                    <div key={label} className={span === 2 ? 'lg:col-span-2' : ''}>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">
                        {label}
                      </label>
                      <input
                        type="text"
                        className="
                          w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4
                          text-[13px] text-[#f5f0e8] placeholder-[#3a3a3a]
                          focus:outline-none focus:border-[#b5692a] transition-colors
                        "
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Shipping */}
            {step === 1 && (
              <div>
                <h2 className="text-[26px] font-light text-[#f5f0e8] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Método de entrega
                </h2>
                <div className="space-y-3">
                  {[
                    { id: 'standard', label: 'Padrão', desc: '5–7 dias úteis', price: 0, tag: 'Grátis' },
                    { id: 'express', label: 'Expresso', desc: '2–3 dias úteis', price: 19.9, tag: '' },
                    { id: 'same', label: 'No mesmo dia', desc: 'SP e RJ — até 24h', price: 39.9, tag: 'Rápido' },
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center gap-4 p-4 border border-[#2a2a2a] cursor-pointer hover:border-[#b5692a] transition-colors group">
                      <input type="radio" name="shipping" defaultChecked={opt.id === 'standard'} className="accent-[#b5692a]" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] text-[#d4cfc6]">{opt.label}</span>
                          {opt.tag && (
                            <span className="text-[8px] tracking-widest uppercase bg-[#b5692a]/20 text-[#d4843c] px-2 py-0.5">
                              {opt.tag}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#6b6b6b]">{opt.desc}</span>
                      </div>
                      <span className="text-[13px] text-[#d4cfc6]">
                        {opt.price === 0 ? 'Grátis' : formatPrice(opt.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div>
                <h2 className="text-[26px] font-light text-[#f5f0e8] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Pagamento
                </h2>

                {/* Method tabs */}
                <div className="flex border border-[#2a2a2a] mb-8 divide-x divide-[#2a2a2a]">
                  {(['card', 'pix', 'boleto'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setPayMethod(m)}
                      className={`
                        flex-1 h-11 text-[11px] tracking-[0.15em] uppercase transition-all
                        ${payMethod === m
                          ? 'bg-[#b5692a] text-[#f5f0e8]'
                          : 'text-[#6b6b6b] hover:text-[#d4cfc6] hover:bg-[#1a1a1a]'
                        }
                      `}
                    >
                      {m === 'card' ? 'Cartão' : m === 'pix' ? 'Pix' : 'Boleto'}
                    </button>
                  ))}
                </div>

                {payMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">Número do cartão</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4 text-[13px] text-[#f5f0e8] placeholder-[#3a3a3a] focus:outline-none focus:border-[#b5692a] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">Nome no cartão</label>
                      <input type="text" className="w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">Validade</label>
                        <input type="text" placeholder="MM/AA" className="w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4 text-[13px] text-[#f5f0e8] placeholder-[#3a3a3a] focus:outline-none focus:border-[#b5692a] transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">CVV</label>
                        <input type="text" placeholder="000" className="w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4 text-[13px] text-[#f5f0e8] placeholder-[#3a3a3a] focus:outline-none focus:border-[#b5692a] transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">Parcelas</label>
                      <select className="w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors appearance-none">
                        {[1, 2, 3, 6, 12].map((n) => (
                          <option key={n}>{n}× de {formatPrice(total / n)}{n === 1 ? ' (à vista)' : n <= 3 ? ' sem juros' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {payMethod === 'pix' && (
                  <div className="text-center py-8 border border-[#2a2a2a] bg-[#1a1a1a]">
                    <div className="w-36 h-36 border border-[#2a2a2a] mx-auto mb-4 flex items-center justify-center">
                      <span className="text-[9px] text-[#3a3a3a] tracking-widest uppercase">QR Code</span>
                    </div>
                    <p className="text-[13px] text-[#d4cfc6] mb-1">Escaneie o código QR para pagar</p>
                    <p className="text-[11px] text-[#6b6b6b]">O código expira em 30 minutos</p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <span className="text-[12px] text-[#6b6b6b] font-mono truncate max-w-[200px]">00020126360014BR.GOV.BCB.PIX...</span>
                      <button className="text-[10px] text-[#b5692a] hover:text-[#d4843c] transition-colors">Copiar</button>
                    </div>
                  </div>
                )}

                {payMethod === 'boleto' && (
                  <div className="border border-[#2a2a2a] bg-[#1a1a1a] p-6">
                    <p className="text-[13px] text-[#d4cfc6] mb-2">Boleto bancário</p>
                    <p className="text-[12px] text-[#6b6b6b] leading-relaxed mb-4">
                      O boleto será gerado após confirmação do pedido. Prazo de pagamento: 3 dias úteis. O pedido só será processado após o pagamento ser compensado.
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-[#6b6b6b]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#b5692a]">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      Entrega liberada após compensação (1–2 dias úteis)
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div>
                <h2 className="text-[26px] font-light text-[#f5f0e8] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Revisão do pedido
                </h2>

                <div className="space-y-6">
                  {[
                    { title: 'Endereço de entrega', content: 'Rua das Flores, 123 — Apto 45\nJardim Paulista, São Paulo — SP\nCEP 01310-100' },
                    { title: 'Método de entrega', content: 'Padrão — Grátis (5–7 dias úteis)' },
                    { title: 'Pagamento', content: 'Cartão Visa •••• 4242\n3× de ' + formatPrice(total / 3) + ' sem juros' },
                  ].map(({ title, content }) => (
                    <div key={title} className="border border-[#2a2a2a] p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-[#b5692a]">{title}</span>
                        <button className="text-[10px] text-[#6b6b6b] hover:text-[#d4843c] transition-colors">Editar</button>
                      </div>
                      <p className="text-[12px] text-[#d4cfc6] whitespace-pre-line leading-relaxed">{content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-10">
              {step > 0 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="h-11 px-6 border border-[#2a2a2a] text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] hover:border-[#b5692a] hover:text-[#d4843c] transition-all"
                >
                  ← Voltar
                </button>
              ) : <div />}

              {step < STEPS.length - 1 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="h-11 px-10 bg-[#b5692a] text-[#f5f0e8] text-[11px] tracking-[0.2em] uppercase hover:bg-[#d4843c] transition-colors"
                >
                  Continuar →
                </button>
              ) : (
                <button className="h-12 px-10 bg-[#b5692a] text-[#f5f0e8] text-[11px] tracking-[0.2em] uppercase hover:bg-[#d4843c] transition-colors flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                  Confirmar pedido
                </button>
              )}
            </div>
          </div>

          {/* ─── Order Summary sidebar ─── */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 sticky top-24">
            <h3 className="text-[13px] tracking-[0.15em] uppercase text-[#d4cfc6] mb-5">Seu pedido</h3>

            <div className="divide-y divide-[#2a2a2a] mb-5">
              {MOCK_CART.map((item) => (
                <div key={item.id} className="flex justify-between items-start py-3 gap-3">
                  <div className="flex gap-3">
                    <div className="w-10 aspect-square bg-[#0e0e0e] border border-[#2a2a2a] shrink-0" />
                    <div>
                      <p className="text-[12px] text-[#d4cfc6] leading-snug">{item.name}</p>
                      <p className="text-[10px] text-[#6b6b6b]">Qtd: {item.qty}</p>
                    </div>
                  </div>
                  <span className="text-[12px] text-[#d4cfc6] shrink-0">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-[12px] border-t border-[#2a2a2a] pt-4">
              <div className="flex justify-between">
                <span className="text-[#6b6b6b]">Subtotal</span>
                <span className="text-[#d4cfc6]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6b6b6b]">Frete</span>
                <span className="text-[#6a9e5a]">Grátis</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-[#2a2a2a] mt-2">
                <span className="text-[#d4cfc6] text-[13px]">Total</span>
                <span className="text-[#f5f0e8] text-[16px]">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-5 pt-4 border-t border-[#2a2a2a]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#b5692a]">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round"/>
              </svg>
              <span className="text-[9px] text-[#6b6b6b]">Compra 100% segura e criptografada</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
