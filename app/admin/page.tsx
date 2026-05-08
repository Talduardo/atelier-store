import Link from 'next/link'
import { getDashboardStats, getAdminOrders } from '@/lib/queries/orders'
import { formatPrice, formatDate } from '@/lib/utils'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/constants'
import { getAdminProducts } from '@/lib/queries/products'

export default async function AdminDashboard() {
  const [stats, orders, products] = await Promise.all([
    getDashboardStats(),
    getAdminOrders(5),
    getAdminProducts(),
  ])

  const lowStock = products.filter(p => p.stock <= 3 && p.is_active)

  const kpis = [
    { label: 'Receita (mês)', value: formatPrice(stats.revenue) },
    { label: 'Pedidos (mês)', value: String(stats.orders) },
    { label: 'Ticket médio', value: formatPrice(stats.avgTicket) },
    { label: 'Clientes novos', value: String(stats.newCustomers) },
  ]

  return (
    <div className="p-8 lg:p-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-[32px] font-light text-[#f5f0e8]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>Dashboard</h1>
          <p className="text-[12px] text-[#6b6b6b]">
            {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products/new"
            className="h-9 px-5 bg-[#b5692a] text-[#f5f0e8] text-[11px] tracking-[0.15em] uppercase hover:bg-[#d4843c] transition-colors flex items-center">
            + Novo produto
          </Link>
          <Link href="/" target="_blank"
            className="h-9 px-5 border border-[#2a2a2a] text-[#6b6b6b] text-[11px] tracking-[0.15em] uppercase hover:border-[#b5692a] hover:text-[#d4843c] transition-all flex items-center gap-2">
            Ver loja ↗
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {kpis.map(({ label, value }) => (
          <div key={label} className="bg-[#141414] border border-[#1e1e1e] p-5">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">{label}</p>
            <p className="text-[28px] font-light text-[#f5f0e8]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        {/* Recent Orders */}
        <div className="bg-[#141414] border border-[#1e1e1e]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e]">
            <h2 className="text-[13px] tracking-[0.1em] uppercase text-[#d4cfc6]">Pedidos recentes</h2>
            <Link href="/admin/orders" className="text-[10px] text-[#b5692a] hover:text-[#d4843c] transition-colors">Ver todos →</Link>
          </div>
          {orders.length === 0 ? (
            <div className="px-6 py-10 text-center text-[12px] text-[#6b6b6b]">Nenhum pedido ainda.</div>
          ) : (
            <div className="divide-y divide-[#1e1e1e]">
              {orders.map((o) => {
                const statusLabel = ORDER_STATUS_LABELS[o.status as keyof typeof ORDER_STATUS_LABELS] ?? o.status
                const statusColor = ORDER_STATUS_COLORS[o.status as keyof typeof ORDER_STATUS_COLORS] ?? ''
                return (
                  <div key={o.id} className="px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-[#1a1a1a] transition-colors">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-[11px] font-mono text-[#6b6b6b] shrink-0">{o.id.slice(0, 8).toUpperCase()}</span>
                      <span className="text-[12px] text-[#d4cfc6] truncate">
                        {(o.shipping_address as { name?: string })?.name ?? 'Cliente'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-[11px] text-[#d4cfc6]">{formatPrice(o.total)}</span>
                      <span className={`text-[9px] tracking-widest uppercase px-2 py-1 ${statusColor}`}>{statusLabel}</span>
                      <span className="text-[10px] text-[#6b6b6b]">{formatDate(o.created_at)}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Low Stock */}
        <div className="bg-[#141414] border border-[#1e1e1e]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e]">
            <h2 className="text-[13px] tracking-[0.1em] uppercase text-[#d4cfc6]">Estoque baixo</h2>
            <Link href="/admin/products" className="text-[10px] text-[#b5692a] hover:text-[#d4843c] transition-colors">Ver →</Link>
          </div>
          {lowStock.length === 0 ? (
            <div className="px-6 py-10 text-center text-[12px] text-[#6b6b6b]">Nenhum produto com estoque baixo.</div>
          ) : (
            <div className="divide-y divide-[#1e1e1e]">
              {lowStock.slice(0, 5).map((p) => (
                <div key={p.sku} className="px-6 py-3.5 flex items-center justify-between hover:bg-[#1a1a1a] transition-colors">
                  <div>
                    <p className="text-[12px] text-[#d4cfc6]">{p.name}</p>
                    <p className="text-[10px] text-[#6b6b6b] font-mono">{p.sku}</p>
                  </div>
                  <span className={`text-[11px] font-medium px-2 py-0.5 ${p.stock === 0 ? 'text-[#e24b4a] bg-[#a32d2d]/15' : 'text-[#d4843c] bg-[#b5692a]/15'}`}>
                    {p.stock === 0 ? 'Esgotado' : `${p.stock} un.`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
