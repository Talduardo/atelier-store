'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { register } from '@/lib/actions/auth'

export default function RegisterPage() {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirm = formData.get('confirm') as string
    if (password !== confirm) {
      setMessage({ type: 'error', text: 'As senhas não coincidem.' })
      return
    }
    startTransition(async () => {
      const result = await register(formData)
      if (result?.error) setMessage({ type: 'error', text: result.error })
      else if (result?.success) setMessage({ type: 'success', text: result.success })
    })
  }

  return (
    <div className="flex-1 flex pt-14">
      {/* Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 lg:px-16 py-16 order-2 lg:order-1">
        <div className="w-full max-w-[380px]">
          <div className="mb-8">
            <h1 className="text-[34px] font-light text-[#f5f0e8] mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>Criar conta</h1>
            <p className="text-[13px] text-[#6b6b6b]">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-[#b5692a] hover:text-[#d4843c] transition-colors">Entrar</Link>
            </p>
          </div>

          {message && (
            <div className={`text-[12px] px-4 py-3 mb-4 border ${message.type === 'error' ? 'border-[#e24b4a]/30 text-[#e24b4a] bg-[#e24b4a]/5' : 'border-[#6a9e5a]/30 text-[#6a9e5a] bg-[#6a9e5a]/5'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">Nome</label>
                <input type="text" name="firstName" required
                  className="w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">Sobrenome</label>
                <input type="text" name="lastName" required
                  className="w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">E-mail</label>
              <input type="email" name="email" required autoComplete="email"
                className="w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">Senha</label>
              <input type="password" name="password" required minLength={6} autoComplete="new-password"
                className="w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">Confirmar senha</label>
              <input type="password" name="confirm" required minLength={6} autoComplete="new-password"
                className="w-full h-11 bg-[#1a1a1a] border border-[#2a2a2a] px-4 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors" />
            </div>
            <button type="submit" disabled={isPending}
              className="w-full h-11 bg-[#b5692a] text-[#f5f0e8] text-[11px] tracking-[0.2em] uppercase hover:bg-[#d4843c] transition-colors disabled:opacity-60 mt-1">
              {isPending ? 'Criando conta...' : 'Criar conta'}
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

      {/* Decorative right panel */}
      <div className="hidden lg:flex w-[42%] bg-[#1a1a1a] border-l border-[#2a2a2a] relative overflow-hidden flex-col justify-end p-14 order-2">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8a4d1e] via-[#d4843c] to-[#8a4d1e]" />
        <div className="absolute top-24 left-10 w-72 h-72 bg-[#b5692a] opacity-[0.05] rounded-full blur-[80px]" />
        <div className="relative space-y-6">
          <div className="w-8 h-px bg-[#b5692a]" />
          <h2 className="text-[28px] font-light text-[#f5f0e8] leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Vantagens para<br /><em className="italic text-[#d4843c]">membros</em>
          </h2>
          {['Acesso antecipado a novidades', 'Histórico de pedidos completo', 'Devoluções simplificadas', '10% de desconto na 1ª compra'].map((v) => (
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
