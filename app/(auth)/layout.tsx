import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#2a2a2a] bg-[#0e0e0e]/95 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-14 flex items-center justify-between">
          <Link href="/" className="group flex flex-col leading-none">
            <span className="text-[18px] tracking-[0.2em] font-light text-[#f5f0e8]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>ATELIER</span>
            <span className="text-[7px] tracking-[0.4em] text-[#b5692a] mt-[-2px]">STORE</span>
          </Link>
          <Link href="/products" className="text-[11px] tracking-[0.1em] uppercase text-[#6b6b6b] hover:text-[#d4843c] transition-colors">
            Explorar catálogo →
          </Link>
        </div>
      </header>
      <main className="flex-1 flex">{children}</main>
    </div>
  )
}
