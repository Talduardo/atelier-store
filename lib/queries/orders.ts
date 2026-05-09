import { createClient } from '@/lib/supabase/server'
import type { Order, OrderItem } from '@/types/order'

// ─── User: get own orders ─────────────────────────────────────────────────────
export async function getUserOrders(userId: string): Promise<Order[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('orders')
    .select(`*, order_items(*)`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) return []
  return (data as Order[]) ?? []
}

// ─── Get single order ─────────────────────────────────────────────────────────
export async function getOrderById(id: string): Promise<Order | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('orders')
    .select(`*, order_items(*)`)
    .eq('id', id)
    .single()

  if (error) return null
  return data as Order
}

// ─── Admin: get all orders ────────────────────────────────────────────────────
export async function getAdminOrders(limit = 50): Promise<Order[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('orders')
    .select(`*, order_items(*)`)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) return []
  return (data as Order[]) ?? []
}

// ─── Admin: update order status ───────────────────────────────────────────────
export async function updateOrderStatus(
  orderId: string,
  status: Order['status'],
): Promise<boolean> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId)

  return !error
}

// ─── Admin: dashboard stats ───────────────────────────────────────────────────
export async function getDashboardStats() {
  const supabase = await createClient()

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  const [ordersRes, revenueRes, customersRes] = await Promise.all([
    supabase
      .from('orders')
      .select('id', { count: 'exact' })
      .gte('created_at', startOfMonth)
      .neq('status', 'cancelled'),

    supabase
      .from('orders')
      .select('total')
      .gte('created_at', startOfMonth)
      .neq('status', 'cancelled'),

    supabase
      .from('profiles')
      .select('id', { count: 'exact' })
      .gte('created_at', startOfMonth),
  ])

  const revenue = (revenueRes.data ?? []).reduce(
    (sum: number, o: { total: number }) => sum + Number(o.total),
    0,
  )
  const orders = ordersRes.count ?? 0
  const avgTicket = orders > 0 ? revenue / orders : 0
  const newCustomers = customersRes.count ?? 0

  return { revenue, orders, avgTicket, newCustomers }
}
