'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// ─── Login with email/password ────────────────────────────────────────────────
export async function loginWithEmail(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: 'Email ou senha incorretos.' }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

// ─── Register ─────────────────────────────────────────────────────────────────
export async function register(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = `${formData.get('firstName')} ${formData.get('lastName')}`.trim()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm`,
    },
  })

  if (error) {
    return { error: 'Erro ao criar conta. Tente novamente.' }
  }

  return { success: 'Verifique seu e-mail para confirmar o cadastro.' }
}

// ─── Magic Link ───────────────────────────────────────────────────────────────
export async function sendMagicLink(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm`,
    },
  })

  if (error) {
    return { error: 'Erro ao enviar link. Tente novamente.' }
  }

  return { success: 'Link enviado! Verifique seu e-mail.' }
}

// ─── Logout ───────────────────────────────────────────────────────────────────
export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

// ─── Get current session ──────────────────────────────────────────────────────
export async function getSession() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// ─── Get current user ─────────────────────────────────────────────────────────
export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
