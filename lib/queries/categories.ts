import { createClient } from '@/lib/supabase/server'
import type { Category } from '@/types/product'

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  if (error) return []
  return data ?? []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data
}

// Returns categories with product count
export async function getCategoriesWithCount(): Promise<(Category & { count: number })[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .select(`*, products(count)`)
    .order('name', { ascending: true })

  if (error) return []

  return (data ?? []).map((cat: Category & { products: { count: number }[] }) => ({
    ...cat,
    count: cat.products?.[0]?.count ?? 0,
  }))
}
