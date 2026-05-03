export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_price: number
  quantity: number
}

export interface Order {
  id: string
  user_id: string
  status: OrderStatus
  total: number
  subtotal: number
  shipping_cost: number
  items: OrderItem[]
  shipping_address: ShippingAddress
  payment_method: string
  payment_id: string | null
  created_at: string
  updated_at: string
}

export interface ShippingAddress {
  name: string
  email: string
  phone: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zip_code: string
}
