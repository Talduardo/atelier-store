'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

// ─── Create product ───────────────────────────────────────────────────────────
export async function createProduct(formData: FormData) {
  const supabase = await createClient()

  const name         = formData.get('name') as string
  const description  = formData.get('description') as string
  const price        = parseFloat(formData.get('price') as string)
  const originalPrice = formData.get('original_price')
    ? parseFloat(formData.get('original_price') as string)
    : null
  const stock        = parseInt(formData.get('stock') as string)
  const categoryId   = formData.get('category_id') as string
  const sku          = formData.get('sku') as string
  const isFeatured   = formData.get('is_featured') === 'true'

  const slug = slugify(name)

  const { data, error } = await supabase
    .from('products')
    .insert({
      name, slug, description, price, original_price: originalPrice,
      stock, category_id: categoryId, sku, is_featured: isFeatured,
      is_active: true,
    })
    .select()
    .single()

  if (error) return { error: 'Erro ao criar produto.' }

  revalidatePath('/admin/products')
  revalidatePath('/products')
  return { success: true, id: data.id }
}

// ─── Update product ───────────────────────────────────────────────────────────
export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient()

  const name         = formData.get('name') as string
  const description  = formData.get('description') as string
  const price        = parseFloat(formData.get('price') as string)
  const originalPrice = formData.get('original_price')
    ? parseFloat(formData.get('original_price') as string)
    : null
  const stock        = parseInt(formData.get('stock') as string)
  const categoryId   = formData.get('category_id') as string
  const sku          = formData.get('sku') as string
  const isActive     = formData.get('is_active') === 'true'
  const isFeatured   = formData.get('is_featured') === 'true'

  const { error } = await supabase
    .from('products')
    .update({
      name, description, price, original_price: originalPrice,
      stock, category_id: categoryId, sku,
      is_active: isActive, is_featured: isFeatured,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) return { error: 'Erro ao atualizar produto.' }

  revalidatePath('/admin/products')
  revalidatePath('/products')
  revalidatePath(`/products/${id}`)
  return { success: true }
}

// ─── Delete product ───────────────────────────────────────────────────────────
export async function deleteProduct(id: string) {
  const supabase = await createClient()

  // Soft delete: set is_active = false
  const { error } = await supabase
    .from('products')
    .update({ is_active: false })
    .eq('id', id)

  if (error) return { error: 'Erro ao remover produto.' }

  revalidatePath('/admin/products')
  revalidatePath('/products')
  return { success: true }
}

// ─── Upload product image ─────────────────────────────────────────────────────
export async function uploadProductImage(productId: string, formData: FormData) {
  const supabase = await createClient()
  const file = formData.get('image') as File
  if (!file) return { error: 'Nenhuma imagem enviada.' }

  const ext = file.name.split('.').pop()
  const path = `${productId}/${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('products')
    .upload(path, file, { upsert: true })

  if (uploadError) return { error: 'Erro ao fazer upload da imagem.' }

  // Append to images array
  const { data: product } = await supabase
    .from('products')
    .select('images')
    .eq('id', productId)
    .single()

  const images = [...(product?.images ?? []), path]

  await supabase
    .from('products')
    .update({ images })
    .eq('id', productId)

  revalidatePath(`/products/${productId}`)
  return { success: true, path }
}
