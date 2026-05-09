import { type ClassValue, clsx } from 'clsx'

// ─── Classnames ───────────────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// ─── Currency ─────────────────────────────────────────────────────────────────
export function formatPrice(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function calculateDiscount(price: number, originalPrice: number): number {
  return Math.round((1 - price / originalPrice) * 100)
}

// ─── Slug ─────────────────────────────────────────────────────────────────────
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

// ─── Date ─────────────────────────────────────────────────────────────────────
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

// ─── CEP ──────────────────────────────────────────────────────────────────────
export async function fetchAddressByCep(cep: string) {
  const cleanCep = cep.replace(/\D/g, '')
  if (cleanCep.length !== 8) return null

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
    const data = await res.json()
    if (data.erro) return null
    return {
      street:       data.logradouro,
      neighborhood: data.bairro,
      city:         data.localidade,
      state:        data.uf,
    }
  } catch {
    return null
  }
}

// ─── Installments ─────────────────────────────────────────────────────────────
export function getInstallments(total: number, max = 12, freeUpTo = 3) {
  return Array.from({ length: max }, (_, i) => {
    const n = i + 1
    return {
      n,
      value: total / n,
      label:
        n === 1
          ? `${formatPrice(total)} à vista`
          : n <= freeUpTo
          ? `${n}× de ${formatPrice(total / n)} sem juros`
          : `${n}× de ${formatPrice(total / n)}`,
    }
  })
}

// ─── Image ────────────────────────────────────────────────────────────────────
export function getProductImageUrl(path: string | null): string | null {
  if (!path) return null
  if (path.startsWith('http')) return path
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  return `${supabaseUrl}/storage/v1/object/public/products/${path}`
}
