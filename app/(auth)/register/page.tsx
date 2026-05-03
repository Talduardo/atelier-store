'use client'

import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="flex-1 flex pt-14">

      {/* Left — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 lg:px-16 py-16 order-2 lg:order-1">
        <div className="w-full max-w-[380px]">
          <div className="mb-8">
            <h1
              className="text-[34px] font-light text-[#f5f0e8] mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Criar conta
            </h1>
            <p className="text-[13px] text-[#6b6b6b]">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-[#b5692a] hover:text-[#d4843c] transition-colors">
                Entrar
              </Link>
            </p>
          </div>

          {/* Google */}
          <button className="w-full h-11 border border-[#2a2a2a] flex items-center justify-center gap-3 mb-6 text-[12px] text-[#d4cfc6] hover:border-[#b5692a] hover:bg-[#1a1a1a] transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Registrar com Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#2a2a2a]" />
            <span className="text-[10px] tracking-[0.2em] text-[#3a3a3a] uppercase">ou</span>
            <div className="flex-1 h-px bg-[#2a2a2a]" />
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">Nome</label>
                <input type="text" className="w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">Sobrenome</label>
                <input type="text" className="w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">E-mail</label>
              <input type="email" className="w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">Senha</label>
              <input type="password" className="w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">Confirmar senha</label>
              <input type="password" className="w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors" />
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="w-4 h-4 border border-[#2a2a2a] group-hover:border-[#b5692a] transition-colors shrink-0 mt-0.5" />
              <span className="text-[11px] text-[#6b6b6b] leading-relaxed">
                Aceito receber novidades e ofertas por e-mail (opcional)
              </span>
            </label>

            <button
              type="submit"
              className="w-full h-11 bg-[#b5692a] text-[#f5f0e8] text-[11px] tracking-[0.2em] uppercase hover:bg-[#d4843c] transition-colors mt-1"
            >
              Criar conta
            </button>
          </form>

          <p className="text-[10px] text-[#3a3a3a] text-center mt-6 leading-relaxed">
            Ao criar uma conta, você concorda com os{' '}
            <Link href="/terms" className="text-[#6b6b6b] hover:text-[#d4843c] transition-colors">Termos de Uso</Link>
            {' '}e a{' '}
            <Link href="/privacy" className="text-[#6b6b6b] hover:text-[#d4843c] transition-colors">Política de Privacidade</Link>.
          </p>
        </div>
      </div>

      {/* Right — decorative */}
      <div className="hidden lg:flex w-[42%] bg-[#1a1a1a] border-l border-[#2a2a2a] relative overflow-hidden flex-col justify-end p-14 order-2">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #f5f0e8 0px, #f5f0e8 1px, transparent 1px, transparent 40px)`
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8a4d1e] via-[#d4843c] to-[#8a4d1e]" />
        <div className="absolute top-24 left-10 w-72 h-72 bg-[#b5692a] opacity-[0.05] rounded-full blur-[80px]" />

        <div className="relative space-y-6">
          <div className="w-8 h-px bg-[#b5692a]" />
          <h2
            className="text-[28px] font-light text-[#f5f0e8] leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Vantagens para
            <br />
            <em className="italic text-[#d4843c]">membros</em>
          </h2>
          {[
            'Acesso antecipado a novidades',
            'Histórico de pedidos completo',
            'Devoluções simplificadas',
            '10% de desconto na 1ª compra',
          ].map((v) => (
            <div key={v} className="flex items-center gap-3">
              <div className="w-1 h-1 bg-[#b5692a] rounded-full shrink-0" />
              <span className="text-[12px] text-[#6b6b6b]">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
