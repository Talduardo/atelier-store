import Link from 'next/link'
import type { Metadata } from 'next'
import type { ReactElement } from 'react'

export const metadata: Metadata = { title: 'Painel Admin — Atelier Store' }

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: 'grid' },
  { href: '/admin/products', label: 'Produtos', icon: 'box' },
  { href: '/admin/orders', label: 'Pedidos', icon: 'shopping-bag' },
  { href: '/admin/customers', label: 'Clientes', icon: 'users' },
  { href: '/admin/analytics', label: 'Analytics', icon: 'bar-chart' },
  { href: '/admin/settings', label: 'Configurações', icon: 'settings' },
]

const ICONS: Record<string, () => ReactElement> = {
  grid: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  box: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  'shopping-bag': () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  users: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  'bar-chart': () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  settings: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">

      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-[#1e1e1e] flex flex-col sticky top-0 h-screen overflow-y-auto">

        {/* Logo */}
        <div className="p-6 border-b border-[#1e1e1e]">
          <Link href="/" className="flex flex-col leading-none">
            <span className="text-[16px] tracking-[0.2em] font-light text-[#f5f0e8]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>ATELIER</span>
            <span className="text-[7px] tracking-[0.4em] text-[#b5692a] mt-[-2px]">ADMIN</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-0.5">
          {NAV.map(({ href, label, icon }) => {
            const Icon = ICONS[icon]
            return (
              <Link
                key={href}
                href={href}
                className="
                  flex items-center gap-3 h-9 px-3 text-[12px] tracking-wide text-[#6b6b6b]
                  hover:text-[#f5f0e8] hover:bg-[#1a1a1a] transition-all rounded-sm
                "
              >
                <Icon />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#b5692a]/20 border border-[#b5692a]/40 flex items-center justify-center text-[10px] text-[#d4843c]">
              A
            </div>
            <div>
              <p className="text-[11px] text-[#d4cfc6]">Admin</p>
              <p className="text-[10px] text-[#6b6b6b]">admin@atelier.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}