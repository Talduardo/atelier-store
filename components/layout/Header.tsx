'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCart } from '@/hooks/use-cart'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const NAV_LINKS = [
  { href: '/products', label: 'Catálogo' },
  { href: '/products?categoria=novidades', label: 'Novidades' },
  { href: '/products?categoria=destaque', label: 'Destaques' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const { itemCount } = useCart()
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false); setUserMenuOpen(false) }, [pathname])

  // Watch auth state
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
    router.refresh()
  }

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] ?? user?.email?.split('@')[0] ?? 'Conta'

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0e0e0e]/95 backdrop-blur-md border-b border-[#2a2a2a]' : 'bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="group flex flex-col leading-none">
              <span className="text-[22px] tracking-[0.2em] font-light text-[#f5f0e8] group-hover:text-[#d4843c] transition-colors duration-300"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>ATELIER</span>
              <span className="text-[9px] tracking-[0.4em] text-[#b5692a] font-light mt-[-2px]">STORE</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map(({ href, label }) => (
                <Link key={href} href={href}
                  className={`text-[11px] tracking-[0.2em] uppercase font-light transition-colors duration-200 relative group ${pathname.startsWith(href.split('?')[0]) ? 'text-[#d4843c]' : 'text-[#d4cfc6] hover:text-[#f5f0e8]'}`}>
                  {label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#b5692a] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-5">

              {/* User menu */}
              <div className="hidden lg:block relative">
                {user ? (
                  <>
                    <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 text-[#6b6b6b] hover:text-[#f5f0e8] transition-colors group">
                      <div className="w-7 h-7 bg-[#b5692a]/20 border border-[#b5692a]/40 flex items-center justify-center text-[11px] text-[#d4843c] font-medium">
                        {firstName[0].toUpperCase()}
                      </div>
                      <span className="text-[11px] tracking-wide">{firstName}</span>
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-44 bg-[#1a1a1a] border border-[#2a2a2a] py-1 z-50">
                        <Link href="/orders"
                          className="block px-4 py-2.5 text-[11px] text-[#d4cfc6] hover:bg-[#2a2a2a] hover:text-[#f5f0e8] transition-colors tracking-wide">
                          Meus pedidos
                        </Link>
                        <Link href="/admin"
                          className="block px-4 py-2.5 text-[11px] text-[#d4cfc6] hover:bg-[#2a2a2a] hover:text-[#f5f0e8] transition-colors tracking-wide">
                          Painel admin
                        </Link>
                        <div className="border-t border-[#2a2a2a] mt-1 pt-1">
                          <button onClick={handleLogout}
                            className="w-full text-left px-4 py-2.5 text-[11px] text-[#6b6b6b] hover:bg-[#2a2a2a] hover:text-[#e24b4a] transition-colors tracking-wide">
                            Sair
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link href="/login" className="flex items-center gap-2 text-[#6b6b6b] hover:text-[#f5f0e8] transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round"/>
                    </svg>
                    <span className="text-[11px] tracking-wide">Entrar</span>
                  </Link>
                )}
              </div>

              {/* Cart */}
              <Link href="/cart" className="relative text-[#6b6b6b] hover:text-[#f5f0e8] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round"/>
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#b5692a] text-[#f5f0e8] text-[9px] flex items-center justify-center rounded-full font-medium">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile hamburger */}
              <button className="lg:hidden text-[#d4cfc6] hover:text-[#f5f0e8] transition-colors p-1"
                onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                {menuOpen
                  ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/></svg>
                  : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="7" x2="21" y2="7" strokeLinecap="round"/><line x1="3" y1="17" x2="21" y2="17" strokeLinecap="round"/></svg>
                }
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay to close user menu */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-[#0e0e0e]/98 backdrop-blur-lg flex flex-col transition-all duration-500 lg:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col justify-center h-full px-10 gap-10">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="block">
              <span className="text-5xl font-light text-[#f5f0e8]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>{label}</span>
            </Link>
          ))}
          <div className="border-t border-[#2a2a2a] pt-8 flex flex-wrap gap-6">
            {user ? (
              <>
                <span className="text-[12px] text-[#d4843c]">{firstName}</span>
                <Link href="/orders" className="text-[11px] tracking-[0.2em] uppercase text-[#6b6b6b] hover:text-[#d4843c] transition-colors">Pedidos</Link>
                <button onClick={handleLogout} className="text-[11px] tracking-[0.2em] uppercase text-[#6b6b6b] hover:text-[#e24b4a] transition-colors">Sair</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-[11px] tracking-[0.2em] uppercase text-[#6b6b6b] hover:text-[#d4843c] transition-colors">Entrar</Link>
                <Link href="/register" className="text-[11px] tracking-[0.2em] uppercase text-[#6b6b6b] hover:text-[#d4843c] transition-colors">Criar conta</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
