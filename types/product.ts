export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  original_price: number | null
  stock: number
  category_id: string
  images: string[]
  is_active: boolean
  is_featured: boolean
  sku: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
}

export interface ProductWithCategory extends Product {
  category: Category
}
