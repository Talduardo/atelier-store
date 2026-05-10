import Link from 'next/link'
import { getAdminOrders, updateOrderStatus } from '@/lib/queries/orders'
import { formatPrice, formatDateTime } from '@/lib/utils'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/constants'
import type { Order } from '@/types/order'

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders(100)

  return (
    <div className="p-8 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-light text-[#f5f0e8]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>Pedidos</h1>
          <p className="text-[12px] text-[#6b6b6b]">{orders.length} pedido{orders.length !== 1 ? 's' : ''} no total</p>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['Todos', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
          <span key={s}
            className="px-3 py-1 border border-[#2a2a2a] text-[10px] tracking-[0.15em] uppercase text-[#6b6b6b] cursor-pointer hover:border-[#b5692a] hover:text-[#d4843c] transition-all">
            {s === 'Todos' ? s : ORDER_STATUS_LABELS[s as keyof typeof ORDER_STATUS_LABELS]}
          </span>
        ))}
      </div>

      <div className="bg-[#141414] border border-[#1e1e1e] overflow-hidden">
        {/* Header */}
        <div className="hidden lg:grid grid-cols-[180px_1fr_120px_130px_120px_100px] gap-4 px-6 py-3 border-b border-[#1e1e1e]">
          {['ID', 'Cliente / Endereço', 'Total', 'Status', 'Data', 'Ações'].map(h => (
            <span key={h} className="text-[9px] tracking-[0.25em] uppercase text-[#6b6b6b]">{h}</span>
          ))}
        </div>

        {orders.length === 0 ? (
          <div className="px-6 py-16 text-center text-[12px] text-[#6b6b6b]">
            Nenhum pedido ainda.
          </div>
        ) : (
          <div className="divide-y divide-[#1e1e1e]">
            {orders.map((order) => {
              const addr = order.shipping_address as { name?: string; city?: string; state?: string } | null
              const statusLabel = ORDER_STATUS_LABELS[order.status as keyof typeof ORDER_STATUS_LABELS] ?? order.status
              const statusColor = ORDER_STATUS_COLORS[order.status as keyof typeof ORDER_STATUS_COLORS] ?? ''

              return (
                <div key={order.id} className="px-6 py-4 hover:bg-[#1a1a1a] transition-colors">
                  {/* Desktop layout */}
                  <div className="hidden lg:grid grid-cols-[180px_1fr_120px_130px_120px_100px] gap-4 items-center">
                    <span className="text-[11px] font-mono text-[#6b6b6b] truncate">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </span>
                    <div>
                      <p className="text-[13px] text-[#d4cfc6]">{addr?.name ?? 'Cliente'}</p>
                      {addr?.city && (
                        <p className="text-[11px] text-[#6b6b6b]">{addr.city}, {addr.state}</p>
                      )}
                      <p className="text-[11px] text-[#3a3a3a] mt-0.5">
                        {(order.order_items as unknown[])?.length ?? 0} {((order.order_items as unknown[])?.length ?? 0) === 1 ? 'item' : 'itens'}
                      </p>
                    </div>
                    <span className="text-[13px] text-[#d4cfc6] font-medium">{formatPrice(order.total)}</span>
                    <StatusBadge status={order.status} orderId={order.id} label={statusLabel} color={statusColor} />
                    <span className="text-[11px] text-[#6b6b6b]">{formatDateTime(order.created_at)}</span>
                    <Link href={`/admin/orders/${order.id}`}
                      className="text-[10px] text-[#6b6b6b] hover:text-[#d4843c] transition-colors">
                      Detalhes →
                    </Link>
                  </div>

                  {/* Mobile layout */}
                  <div className="lg:hidden space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#6b6b6b]">#{order.id.slice(0, 8).toUpperCase()}</span>
                      <span className={`text-[9px] tracking-widest uppercase px-2 py-1 ${statusColor}`}>{statusLabel}</span>
                    </div>
                    <p className="text-[13px] text-[#d4cfc6]">{addr?.name ?? 'Cliente'}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-[#f5f0e8] font-medium">{formatPrice(order.total)}</span>
                      <span className="text-[11px] text-[#6b6b6b]">{formatDateTime(order.created_at)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function StatusBadge({ status, orderId, label, color }: {
  status: string; orderId: string; label: string; color: string
}) {
  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
  return (
    <form action={async (formData: FormData) => {
      'use server'
      const newStatus = formData.get('status') as Order['status']
      await updateOrderStatus(orderId, newStatus)
    }}>
      <select name="status" defaultValue={status}
        onChange={(e) => (e.target.form as HTMLFormElement)?.requestSubmit()}
        className={`text-[9px] tracking-widest uppercase px-2 py-1.5 border-0 cursor-pointer appearance-none focus:outline-none ${color} bg-transparent`}>
        {statuses.map(s => (
          <option key={s} value={s} className="bg-[#1a1a1a] text-[#d4cfc6]">
            {ORDER_STATUS_LABELS[s as keyof typeof ORDER_STATUS_LABELS]}
          </option>
        ))}
      </select>
    </form>
  )
}
