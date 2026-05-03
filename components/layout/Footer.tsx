'use client'

import Link from 'next/link'

const LINKS = {
  Loja: [
    { href: '/products', label: 'Todos os produtos' },
    { href: '/products?categoria=novidades', label: 'Novidades' },
    { href: '/products?categoria=destaque', label: 'Destaques' },
    { href: '/products?categoria=sale', label: 'Promoções' },
  ],
  Conta: [
    { href: '/login', label: 'Entrar' },
    { href: '/register', label: 'Criar conta' },
    { href: '/orders', label: 'Meus pedidos' },
    { href: '/cart', label: 'Carrinho' },
  ],
  Suporte: [
    { href: '/faq', label: 'Dúvidas frequentes' },
    { href: '/shipping', label: 'Frete e entrega' },
    { href: '/returns', label: 'Trocas e devoluções' },
    { href: '/contact', label: 'Fale conosco' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] bg-[#0e0e0e] mt-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">

        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span
                className="block text-[28px] tracking-[0.2em] font-light text-[#f5f0e8]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                ATELIER
              </span>
              <span className="block text-[9px] tracking-[0.4em] text-[#b5692a] mt-[-4px]">
                STORE
              </span>
            </Link>
            <p className="text-[13px] text-[#6b6b6b] leading-relaxed max-w-[260px]">
              Produtos selecionados com cuidado para elevar o cotidiano. Qualidade e estética em cada detalhe.
            </p>

            {/* Social */}
            <div className="flex gap-5 mt-8">
              {['Instagram', 'Pinterest', 'TikTok'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-[10px] tracking-[0.15em] text-[#6b6b6b] hover:text-[#d4843c] transition-colors uppercase"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-[10px] tracking-[0.25em] uppercase text-[#b5692a] mb-5 font-medium">
                {group}
              </h3>
              <ul className="space-y-3">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[13px] text-[#6b6b6b] hover:text-[#f5f0e8] transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-y border-[#2a2a2a] py-10 mb-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <p
                className="text-[22px] font-light text-[#f5f0e8]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Receba novidades em primeira mão
              </p>
              <p className="text-[12px] text-[#6b6b6b] mt-1">
                Cadastre-se e ganhe 10% de desconto na primeira compra.
              </p>
            </div>
            <form className="flex w-full lg:w-auto gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="seu@email.com"
                className="
                  flex-1 lg:w-72 h-11 bg-[#1a1a1a] border border-[#2a2a2a]
                  px-4 text-[13px] text-[#f5f0e8] placeholder-[#6b6b6b]
                  focus:outline-none focus:border-[#b5692a] transition-colors
                "
              />
              <button
                type="submit"
                className="
                  h-11 px-6 text-[11px] tracking-[0.2em] uppercase font-medium
                  bg-[#b5692a] text-[#f5f0e8] hover:bg-[#d4843c] transition-colors
                "
              >
                Entrar
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <p className="text-[11px] text-[#6b6b6b]">
            © {new Date().getFullYear()} Atelier Store. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            {['Política de Privacidade', 'Termos de Uso', 'Cookies'].map((t) => (
              <Link
                key={t}
                href="#"
                className="text-[11px] text-[#6b6b6b] hover:text-[#d4843c] transition-colors"
              >
                {t}
              </Link>
            ))}
          </div>
          {/* Payment badges */}
          <div className="flex items-center gap-3 flex-wrap">
            {['Pix', 'Visa', 'Mastercard', 'Boleto'].map((p) => (
              <span
                key={p}
                className="px-2 py-1 border border-[#2a2a2a] text-[9px] tracking-widest text-[#6b6b6b] uppercase"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}