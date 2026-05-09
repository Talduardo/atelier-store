import { createClient } from '@/lib/supabase/server'
import type { Product, ProductWithCategory } from '@/types/product'
import { PRODUCTS_PER_PAGE } from '@/lib/constants'

export async function getProducts({
  category,
  search,
  featured,
  page = 1,
  limit = PRODUCTS_PER_PAGE,
}: {
  category?: string
  search?: string
  featured?: boolean
  page?: number
  limit?: number
} = {}): Promise<{ data: ProductWithCategory[]; count: number }> {
  const supabase = await createClient()
  const from = (page - 1) * limit
  const to = from + limit - 1

  let query = supabase
    .from('products')
    .select(`*, category:categories!products_category_id_fkey(*)`, { count: 'exact' })
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(from, to)

  // Fix: filter by category slug via subquery
  if (category) {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', category)
      .single()
    if (cat) {
      query = query.eq('category_id', cat.id)
    } else {
      return { data: [], count: 0 }
    }
  }

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  if (featured) {
    query = query.eq('is_featured', true)
  }

  const { data, error, count } = await query

  if (error) {
    console.error('getProducts error:', error)
    return { data: [], count: 0 }
  }

  return { data: (data as ProductWithCategory[]) ?? [], count: count ?? 0 }
}

export async function getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`*, category:categories!products_category_id_fkey(*)`)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  if (error) return null
  return data as ProductWithCategory
}

export async function getProductById(id: string): Promise<ProductWithCategory | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`*, category:categories!products_category_id_fkey(*)`)
    .eq('id', id)
    .single()
  if (error) return null
  return data as ProductWithCategory
}

export async function getRelatedProducts(categoryId: string, excludeId: string, limit = 3): Promise<ProductWithCategory[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`*, category:categories!products_category_id_fkey(*)`)
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .neq('id', excludeId)
    .limit(limit)
  if (error) return []
  return (data as ProductWithCategory[]) ?? []
}

export async function searchProducts(query: string, limit = 5): Promise<Partial<Product>[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('id, name, slug, price, images, sku')
    .eq('is_active', true)
    .ilike('name', `%${query}%`)
    .limit(limit)
  if (error) return []
  return data ?? []
}

export async function getAdminProducts(): Promise<ProductWithCategory[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`*, category:categories!products_category_id_fkey(*)`)
    .order('created_at', { ascending: false })
  if (error) return []
  return (data as ProductWithCategory[]) ?? []
}

export async function decrementStock(productId: string, quantity: number) {
  const supabase = await createClient()
  const { error } = await supabase.rpc('decrement_stock', { product_id: productId, qty: quantity })
  return !error
}
