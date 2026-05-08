'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { loginWithEmail, sendMagicLink } from '@/lib/actions/auth'

export default function LoginPage() {
  const [mode, setMode] = useState<'email' | 'magic'>('email')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleEmailLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await loginWithEmail(formData)
      if (result?.error) setMessage({ type: 'error', text: result.error })
    })
  }

  function handleMagicLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await sendMagicLink(formData)
      if (result?.error) setMessage({ type: 'error', text: result.error })
      else if (result?.success) setMessage({ type: 'success', text: result.success })
    })
  }

  return (
    <div className="flex-1 flex pt-14">
      {/* Decorative left panel */}
      <div className="hidden lg:flex w-[45%] bg-[#1a1a1a] border-r border-[#2a2a2a] relative overflow-hidden flex-col justify-end p-14">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8a4d1e] via-[#d4843c] to-[#8a4d1e]" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-[#b5692a] opacity-[0.06] rounded-full blur-[80px]" />
        <div className="relative">
          <div className="w-12 h-px bg-[#b5692a] mb-6" />
          <blockquote className="text-[32px] font-light text-[#f5f0e8] leading-tight mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            &ldquo;Objetos que<br /><em className="italic text-[#d4843c]">revelam</em><br />quem você é.&rdquo;
          </blockquote>
          <p className="text-[11px] tracking-[0.2em] text-[#6b6b6b] uppercase">Atelier Store — Curated Living</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 lg:px-16 py-16">
        <div className="w-full max-w-[360px]">
          <div className="mb-8">
            <h1 className="text-[34px] font-light text-[#f5f0e8] mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>Bem-vindo de volta</h1>
            <p className="text-[13px] text-[#6b6b6b]">
              Não tem conta?{' '}
              <Link href="/register" className="text-[#b5692a] hover:text-[#d4843c] transition-colors">Crie uma agora</Link>
            </p>
          </div>

          {/* Google */}
          <a href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm`}
            className="w-full h-11 border border-[#2a2a2a] flex items-center justify-center gap-3 mb-6 text-[12px] text-[#d4cfc6] hover:border-[#b5692a] hover:bg-[#1a1a1a] transition-all">
            <GoogleIcon />
            Continuar com Google
          </a>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#2a2a2a]" />
            <span className="text-[10px] tracking-[0.2em] text-[#3a3a3a] uppercase">ou</span>
            <div className="flex-1 h-px bg-[#2a2a2a]" />
          </div>

          {/* Mode toggle */}
          <div className="flex border border-[#2a2a2a] mb-6 divide-x divide-[#2a2a2a]">
            {(['email', 'magic'] as const).map((m) => (
              <button key={m} onClick={() => { setMode(m); setMessage(null) }}
                className={`flex-1 h-9 text-[10px] tracking-[0.15em] uppercase transition-all ${mode === m ? 'bg-[#1a1a1a] text-[#d4cfc6]' : 'text-[#3a3a3a] hover:text-[#6b6b6b]'}`}>
                {m === 'email' ? 'Senha' : 'Magic Link'}
              </button>
            ))}
          </div>

          {message && (
            <div className={`text-[12px] px-4 py-3 mb-4 border ${message.type === 'error' ? 'border-[#e24b4a]/30 text-[#e24b4a] bg-[#e24b4a]/5' : 'border-[#6a9e5a]/30 text-[#6a9e5a] bg-[#6a9e5a]/5'}`}>
              {message.text}
            </div>
          )}

          {mode === 'email' ? (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">E-mail</label>
                <input type="email" name="email" required autoComplete="email"
                  className="w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b]">Senha</label>
                </div>
                <input type="password" name="password" required autoComplete="current-password"
                  className="w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors" />
              </div>
              <button type="submit" disabled={isPending}
                className="w-full h-11 bg-[#b5692a] text-[#f5f0e8] text-[11px] tracking-[0.2em] uppercase hover:bg-[#d4843c] transition-colors disabled:opacity-60 mt-2">
                {isPending ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">E-mail</label>
                <input type="email" name="email" required placeholder="seu@email.com" autoComplete="email"
                  className="w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4 text-[13px] text-[#f5f0e8] placeholder-[#3a3a3a] focus:outline-none focus:border-[#b5692a] transition-colors" />
              </div>
              <button type="submit" disabled={isPending}
                className="w-full h-11 bg-[#b5692a] text-[#f5f0e8] text-[11px] tracking-[0.2em] uppercase hover:bg-[#d4843c] transition-colors disabled:opacity-60">
                {isPending ? 'Enviando...' : 'Enviar link de acesso'}
              </button>
              <p className="text-[11px] text-[#6b6b6b] text-center leading-relaxed">
                Vamos enviar um link mágico para o seu email. Nenhuma senha necessária.
              </p>
            </form>
          )}

          <p className="text-[10px] text-[#3a3a3a] text-center mt-8 leading-relaxed">
            Ao entrar, você concorda com os{' '}
            <Link href="/terms" className="text-[#6b6b6b] hover:text-[#d4843c] transition-colors">Termos de Uso</Link>
            {' '}e a{' '}
            <Link href="/privacy" className="text-[#6b6b6b] hover:text-[#d4843c] transition-colors">Política de Privacidade</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}
