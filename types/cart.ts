export interface CartItem {
  id: string
  product_id: string
  name: string
  price: number
  quantity: number
  image_url: string | null
  slug: string
  sku: string
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  total: number
  shipping_cost: number
  discount: number
  coupon_code: string | null
}
