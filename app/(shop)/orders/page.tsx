import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Meus Pedidos' }

const MOCK_ORDERS = [
  {
    id: 'ATL-2025-0041',
    date: '28 abr 2025',
    status: 'delivered',
    total: 829,
    items: [
      { name: 'Vaso Cerâmica Nórdico', qty: 1 },
      { name: 'Luminária de Mesa Arco', qty: 1 },
    ],
  },
  {
    id: 'ATL-2025-0038',
    date: '15 abr 2025',
    status: 'shipped',
    total: 165,
    items: [{ name: 'Cesta Palha Natural', qty: 1 }],
  },
  {
    id: 'ATL-2025-0029',
    date: '02 abr 2025',
    status: 'processing',
    total: 320,
    items: [{ name: 'Porta-Livros Ferro', qty: 1 }],
  },
  {
    id: 'ATL-2025-0012',
    date: '10 mar 2025',
    status: 'delivered',
    total: 1085,
    items: [{ name: 'Espelho Oval Minimal', qty: 1 }, { name: 'Bowl Cerâmica Mate', qty: 2 }],
  },
]

const STATUS_MAP = {
  processing: { label: 'Processando', color: 'text-[#d4843c] bg-[#b5692a]/15' },
  shipped:    { label: 'Em trânsito', color: 'text-[#5ba0d4] bg-[#185fa5]/15' },
  delivered:  { label: 'Entregue',   color: 'text-[#6a9e5a] bg-[#3b6d11]/15' },
  cancelled:  { label: 'Cancelado',  color: 'text-[#e24b4a] bg-[#a32d2d]/15' },
}

const formatPrice = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

export default function OrdersPage() {
  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 py-10 lg:py-14">

        {/* Header */}
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-[11px] text-[#6b6b6b] mb-4">
            <Link href="/" className="hover:text-[#d4843c] transition-colors">Início</Link>
            <span>/</span>
            <span className="text-[#d4cfc6]">Pedidos</span>
          </nav>
          <h1
            className="text-[40px] lg:text-[52px] font-light text-[#f5f0e8]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Meus pedidos
          </h1>
        </div>

        {MOCK_ORDERS.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-[#6b6b6b] mb-6 text-[14px]">Você ainda não fez nenhum pedido.</p>
            <Link href="/products" className="inline-flex items-center h-11 px-8 bg-[#b5692a] text-[#f5f0e8] text-[11px] tracking-[0.2em] uppercase hover:bg-[#d4843c] transition-colors">
              Explorar produtos
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {MOCK_ORDERS.map((order) => {
              const status = STATUS_MAP[order.status as keyof typeof STATUS_MAP]
              return (
                <div
                  key={order.id}
                  className="border border-[#2a2a2a] hover:border-[#b5692a] transition-colors duration-200 group"
                >
                  {/* Order header */}
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-5 lg:p-6 border-b border-[#2a2a2a]">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8">
                      <div>
                        <p className="text-[9px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-0.5">Pedido</p>
                        <p className="text-[14px] text-[#d4cfc6] font-mono">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-[9px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-0.5">Data</p>
                        <p className="text-[13px] text-[#d4cfc6]">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-[9px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-0.5">Total</p>
                        <p className="text-[14px] text-[#f5f0e8]">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 font-medium ${status.color}`}>
                        {status.label}
                      </span>
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-[11px] tracking-[0.1em] uppercase text-[#6b6b6b] hover:text-[#d4843c] transition-colors"
                      >
                        Detalhes →
                      </Link>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="p-5 lg:p-6">
                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                      {order.items.map((item) => (
                        <span key={item.name} className="text-[12px] text-[#6b6b6b]">
                          {item.qty}× {item.name}
                        </span>
                      ))}
                    </div>

                    {/* Progress bar for non-delivered */}
                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                      <div className="mt-5">
                        <div className="flex items-center justify-between mb-2">
                          {['Confirmado', 'Separando', 'Despachado', 'Entregue'].map((s, i) => {
                            const step = order.status === 'processing' ? 1 : 2
                            return (
                              <span
                                key={s}
                                className={`text-[9px] tracking-wide uppercase ${i < step ? 'text-[#b5692a]' : 'text-[#3a3a3a]'}`}
                              >
                                {s}
                              </span>
                            )
                          })}
                        </div>
                        <div className="h-0.5 bg-[#1a1a1a] relative overflow-hidden">
                          <div
                            className="absolute inset-y-0 left-0 bg-[#b5692a] transition-all"
                            style={{ width: order.status === 'processing' ? '25%' : '66%' }}
                          />
                        </div>
                      </div>
                    )}
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
