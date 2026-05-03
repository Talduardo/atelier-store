import Link from 'next/link'

const formatPrice = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

const KPIS = [
  { label: 'Receita (mês)', value: 'R$ 24.890', change: '+12%', up: true },
  { label: 'Pedidos (mês)', value: '87', change: '+5%', up: true },
  { label: 'Ticket médio', value: 'R$ 286', change: '-3%', up: false },
  { label: 'Clientes novos', value: '34', change: '+22%', up: true },
]

const RECENT_ORDERS = [
  { id: 'ATL-2025-0041', customer: 'Ana Lucia M.', total: 829, status: 'delivered', date: '28/04' },
  { id: 'ATL-2025-0040', customer: 'Carlos R.', total: 165, status: 'shipped', date: '27/04' },
  { id: 'ATL-2025-0039', customer: 'Fernanda S.', total: 1320, status: 'processing', date: '26/04' },
  { id: 'ATL-2025-0038', customer: 'Roberto K.', total: 289, status: 'delivered', date: '25/04' },
  { id: 'ATL-2025-0037', customer: 'Juliana P.', total: 780, status: 'shipped', date: '24/04' },
]

const STATUS = {
  processing: { label: 'Processando', cls: 'text-[#d4843c] bg-[#b5692a]/15' },
  shipped:    { label: 'Enviado',     cls: 'text-[#5ba0d4] bg-[#185fa5]/15' },
  delivered:  { label: 'Entregue',   cls: 'text-[#6a9e5a] bg-[#3b6d11]/15' },
}

const LOW_STOCK = [
  { name: 'Vaso Cerâmica Nórdico', sku: 'VCN-001', stock: 3 },
  { name: 'Tapete Berber Bege', sku: 'TBB-006', stock: 1 },
  { name: 'Pendente Rattan Aberto', sku: 'PRA-010', stock: 2 },
]

export default function AdminDashboard() {
  return (
    <div className="p-8 lg:p-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1
            className="text-[32px] font-light text-[#f5f0e8]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Dashboard
          </h1>
          <p className="text-[12px] text-[#6b6b6b]">Maio 2025</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/products/new"
            className="h-9 px-5 bg-[#b5692a] text-[#f5f0e8] text-[11px] tracking-[0.15em] uppercase hover:bg-[#d4843c] transition-colors flex items-center"
          >
            + Novo produto
          </Link>
          <Link
            href="/"
            target="_blank"
            className="h-9 px-5 border border-[#2a2a2a] text-[#6b6b6b] text-[11px] tracking-[0.15em] uppercase hover:border-[#b5692a] hover:text-[#d4843c] transition-all flex items-center gap-2"
          >
            Ver loja ↗
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {KPIS.map(({ label, value, change, up }) => (
          <div key={label} className="bg-[#141414] border border-[#1e1e1e] p-5">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">{label}</p>
            <p
              className="text-[28px] font-light text-[#f5f0e8] mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {value}
            </p>
            <p className={`text-[11px] ${up ? 'text-[#6a9e5a]' : 'text-[#e24b4a]'}`}>
              {change} vs. mês anterior
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">

        {/* Recent Orders */}
        <div className="bg-[#141414] border border-[#1e1e1e]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e]">
            <h2 className="text-[13px] tracking-[0.1em] uppercase text-[#d4cfc6]">Pedidos recentes</h2>
            <Link href="/admin/orders" className="text-[10px] text-[#b5692a] hover:text-[#d4843c] transition-colors tracking-wide">
              Ver todos →
            </Link>
          </div>
          <div className="divide-y divide-[#1e1e1e]">
            {RECENT_ORDERS.map((o) => {
              const s = STATUS[o.status as keyof typeof STATUS]
              return (
                <div key={o.id} className="px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-[#1a1a1a] transition-colors">
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="text-[11px] font-mono text-[#6b6b6b] shrink-0">{o.id}</span>
                    <span className="text-[12px] text-[#d4cfc6] truncate">{o.customer}</span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-[11px] text-[#d4cfc6]">{formatPrice(o.total)}</span>
                    <span className={`text-[9px] tracking-widest uppercase px-2 py-1 ${s.cls}`}>{s.label}</span>
                    <span className="text-[10px] text-[#6b6b6b]">{o.date}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-[#141414] border border-[#1e1e1e]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e]">
            <h2 className="text-[13px] tracking-[0.1em] uppercase text-[#d4cfc6]">Estoque baixo</h2>
            <Link href="/admin/products" className="text-[10px] text-[#b5692a] hover:text-[#d4843c] transition-colors tracking-wide">
              Ver →
            </Link>
          </div>
          <div className="divide-y divide-[#1e1e1e]">
            {LOW_STOCK.map((p) => (
              <div key={p.sku} className="px-6 py-3.5 flex items-center justify-between hover:bg-[#1a1a1a] transition-colors">
                <div>
                  <p className="text-[12px] text-[#d4cfc6]">{p.name}</p>
                  <p className="text-[10px] text-[#6b6b6b] font-mono">{p.sku}</p>
                </div>
                <span className={`text-[11px] font-medium px-2 py-0.5 ${p.stock <= 2 ? 'text-[#e24b4a] bg-[#a32d2d]/15' : 'text-[#d4843c] bg-[#b5692a]/15'}`}>
                  {p.stock} un.
                </span>
              </div>
            ))}
          </div>

          {/* Mini chart placeholder */}
          <div className="px-6 py-5 border-t border-[#1e1e1e]">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-3">Vendas esta semana</p>
            <div className="flex items-end gap-1.5 h-16">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[#b5692a]/30 hover:bg-[#b5692a]/60 transition-colors"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, i) => (
                <span key={i} className="flex-1 text-center text-[8px] text-[#3a3a3a]">{d}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
