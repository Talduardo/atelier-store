'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { CartItem } from '@/types/cart'
import type { ShippingAddress } from '@/types/order'
import { FREE_SHIPPING_THRESHOLD, DEFAULT_SHIPPING_COST } from '@/lib/constants'

// ─── Create order ─────────────────────────────────────────────────────────────
export async function createOrder({
  items,
  shippingAddress,
  paymentMethod,
  couponCode,
}: {
  items: CartItem[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  couponCode?: string
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Usuário não autenticado.' }
  if (items.length === 0) return { error: 'Carrinho vazio.' }

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_COST
  const discount = 0 // TODO: apply coupon logic
  const total = subtotal + shipping - discount

  // Insert order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      status: 'pending',
      subtotal,
      shipping_cost: shipping,
      discount,
      total,
      payment_method: paymentMethod,
      coupon_code: couponCode ?? null,
      shipping_address: shippingAddress,
    })
    .select()
    .single()

  if (orderError || !order) {
    console.error('createOrder error:', orderError)
    return { error: 'Erro ao criar pedido. Tente novamente.' }
  }

  // Insert order items
  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.name,
    product_price: item.price,
    quantity: item.quantity,
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems)

  if (itemsError) {
    console.error('createOrderItems error:', itemsError)
    // Rollback order
    await supabase.from('orders').delete().eq('id', order.id)
    return { error: 'Erro ao salvar itens do pedido.' }
  }

  revalidatePath('/orders')
  return { success: true, orderId: order.id }
}

// ─── Admin: update order status ───────────────────────────────────────────────
export async function updateOrderStatusAction(orderId: string, status: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Não autorizado.' }

  const { error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId)

  if (error) return { error: 'Erro ao atualizar status.' }

  revalidatePath('/admin/orders')
  revalidatePath(`/orders/${orderId}`)
  return { success: true }
}

// ─── Cancel order ─────────────────────────────────────────────────────────────
export async function cancelOrder(orderId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Não autorizado.' }

  const { data: order } = await supabase
    .from('orders')
    .select('status, user_id')
    .eq('id', orderId)
    .single()

  if (!order) return { error: 'Pedido não encontrado.' }
  if (order.user_id !== user.id) return { error: 'Não autorizado.' }
  if (!['pending', 'processing'].includes(order.status)) {
    return { error: 'Este pedido não pode ser cancelado.' }
  }

  const { error } = await supabase
    .from('orders')
    .update({ status: 'cancelled', updated_at: new Date().toISOString() })
    .eq('id', orderId)

  if (error) return { error: 'Erro ao cancelar pedido.' }

  revalidatePath('/orders')
  return { success: true }
}
