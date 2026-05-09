export const APP_NAME = 'Atelier Store'
export const APP_DESCRIPTION = 'Produtos selecionados com cuidado para elevar o cotidiano.'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

// Shipping
export const FREE_SHIPPING_THRESHOLD = 299
export const DEFAULT_SHIPPING_COST = 29.9
export const EXPRESS_SHIPPING_COST = 19.9
export const SAME_DAY_SHIPPING_COST = 39.9

// Pagination
export const PRODUCTS_PER_PAGE = 12

// Cart
export const CART_STORAGE_KEY = 'atelier_cart'
export const MAX_CART_QUANTITY = 99

// Order
export const ORDER_STATUS_LABELS = {
  pending:    'Aguardando pagamento',
  processing: 'Processando',
  shipped:    'Em trânsito',
  delivered:  'Entregue',
  cancelled:  'Cancelado',
} as const

export const ORDER_STATUS_COLORS = {
  pending:    'text-[#d4843c] bg-[#b5692a]/15',
  processing: 'text-[#d4843c] bg-[#b5692a]/15',
  shipped:    'text-[#5ba0d4] bg-[#185fa5]/15',
  delivered:  'text-[#6a9e5a] bg-[#3b6d11]/15',
  cancelled:  'text-[#e24b4a] bg-[#a32d2d]/15',
} as const

// Installments
export const MAX_INSTALLMENTS = 12
export const INSTALLMENTS_WITHOUT_INTEREST = 3
