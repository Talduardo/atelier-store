import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-6">
      <div className="text-center max-w-md">

        {/* Number */}
        <p
          className="text-[120px] lg:text-[160px] font-light text-[#1a1a1a] leading-none select-none"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          aria-hidden
        >
          404
        </p>

        {/* Copper line */}
        <div className="w-12 h-px bg-[#b5692a] mx-auto -mt-6 mb-8" />

        <h1
          className="text-[28px] font-light text-[#f5f0e8] mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Página não encontrada
        </h1>
        <p className="text-[13px] text-[#6b6b6b] leading-relaxed mb-10">
          O endereço que você acessou não existe ou foi removido.
          Que tal explorar o catálogo?
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="
              h-11 px-8 bg-[#b5692a] text-[#f5f0e8]
              text-[11px] tracking-[0.2em] uppercase
              hover:bg-[#d4843c] transition-colors
              flex items-center
            "
          >
            Voltar ao início
          </Link>
          <Link
            href="/products"
            className="
              h-11 px-8 border border-[#2a2a2a] text-[#d4cfc6]
              text-[11px] tracking-[0.2em] uppercase
              hover:border-[#b5692a] hover:text-[#f5f0e8] transition-all
              flex items-center
            "
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    </div>
  )
}
