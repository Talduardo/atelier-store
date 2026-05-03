'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/products', label: 'Catálogo' },
  { href: '/products?categoria=novidades', label: 'Novidades' },
  { href: '/products?categoria=destaque', label: 'Destaques' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount] = useState(2) // will come from store
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? 'bg-[#0e0e0e]/95 backdrop-blur-md border-b border-[#2a2a2a]'
            : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="group flex flex-col leading-none">
              <span
                className="text-[22px] tracking-[0.2em] font-light text-[#f5f0e8] group-hover:text-[#d4843c] transition-colors duration-300"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                ATELIER
              </span>
              <span className="text-[9px] tracking-[0.4em] text-[#b5692a] font-light mt-[-2px]">
                STORE
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`
                    text-[11px] tracking-[0.2em] uppercase font-light transition-colors duration-200
                    relative group
                    ${pathname.startsWith(href.split('?')[0])
                      ? 'text-[#d4843c]'
                      : 'text-[#d4cfc6] hover:text-[#f5f0e8]'
                    }
                  `}
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#b5692a] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-5">
              {/* Search */}
              <button className="hidden lg:flex items-center gap-2 text-[#6b6b6b] hover:text-[#f5f0e8] transition-colors group">
                <SearchIcon />
              </button>

              {/* Account */}
              <Link
                href="/login"
                className="hidden lg:flex text-[#6b6b6b] hover:text-[#f5f0e8] transition-colors"
              >
                <AccountIcon />
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative text-[#6b6b6b] hover:text-[#f5f0e8] transition-colors">
                <CartIcon />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#b5692a] text-[#f5f0e8] text-[9px] flex items-center justify-center rounded-full font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden text-[#d4cfc6] hover:text-[#f5f0e8] transition-colors p-1"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`
          fixed inset-0 z-40 bg-[#0e0e0e]/98 backdrop-blur-lg flex flex-col
          transition-all duration-500 lg:hidden
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div className="flex flex-col justify-center h-full px-10 gap-10">
          {NAV_LINKS.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              className="block"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span
                className={`
                  text-5xl font-light transition-colors duration-200
                  ${menuOpen ? 'text-[#f5f0e8] translate-y-0' : 'text-transparent translate-y-4'}
                `}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {label}
              </span>
            </Link>
          ))}
          <div className="border-t border-[#2a2a2a] pt-8 flex gap-8">
            <Link href="/login" className="text-[11px] tracking-[0.2em] uppercase text-[#6b6b6b] hover:text-[#d4843c] transition-colors">
              Entrar
            </Link>
            <Link href="/register" className="text-[11px] tracking-[0.2em] uppercase text-[#6b6b6b] hover:text-[#d4843c] transition-colors">
              Criar conta
            </Link>
            <Link href="/orders" className="text-[11px] tracking-[0.2em] uppercase text-[#6b6b6b] hover:text-[#d4843c] transition-colors">
              Pedidos
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" strokeLinecap="round" />
    </svg>
  )
}

function AccountIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round"/>
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="3" y1="7" x2="21" y2="7" strokeLinecap="round"/>
      <line x1="3" y1="17" x2="21" y2="17" strokeLinecap="round"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
      <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
    </svg>
  )
}
