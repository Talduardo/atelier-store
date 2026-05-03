import Link from 'next/link'

const formatPrice = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

const PRODUCTS = [
  { id: '1', name: 'Vaso Cerâmica Nórdico', sku: 'VCN-001', price: 289, stock: 7, category: 'Casa', active: true },
  { id: '2', name: 'Luminária de Mesa Arco', sku: 'LMA-002', price: 540, stock: 4, category: 'Iluminação', active: true },
  { id: '3', name: 'Cesta Palha Natural', sku: 'CPN-003', price: 165, stock: 12, category: 'Organização', active: true },
  { id: '4', name: 'Espelho Oval Minimal', sku: 'EOM-004', price: 780, stock: 3, category: 'Decoração', active: true },
  { id: '5', name: 'Porta-Livros Ferro', sku: 'PLF-005', price: 320, stock: 0, category: 'Organização', active: false },
  { id: '6', name: 'Tapete Berber Bege', sku: 'TBB-006', price: 890, stock: 1, category: 'Têxtil', active: true },
  { id: '7', name: 'Bandeja Travertino', sku: 'BT-007', price: 420, stock: 6, category: 'Casa', active: true },
  { id: '8', name: 'Almofada Bouclé', sku: 'AB-008', price: 195, stock: 9, category: 'Têxtil', active: true },
]

export default function AdminProductsPage() {
  return (
    <div className="p-8 lg:p-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-light text-[#f5f0e8]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Produtos
          </h1>
          <p className="text-[12px] text-[#6b6b6b]">{PRODUCTS.length} produtos cadastrados</p>
        </div>
        <Link
          href="/admin/products/new"
          className="h-9 px-5 bg-[#b5692a] text-[#f5f0e8] text-[11px] tracking-[0.15em] uppercase hover:bg-[#d4843c] transition-colors flex items-center gap-2"
        >
          + Adicionar produto
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="search"
          placeholder="Buscar por nome ou SKU…"
          className="h-9 bg-[#141414] border border-[#1e1e1e] px-4 text-[12px] text-[#f5f0e8] placeholder-[#3a3a3a] focus:outline-none focus:border-[#b5692a] transition-colors w-56"
        />
        <select className="h-9 bg-[#141414] border border-[#1e1e1e] px-3 text-[12px] text-[#6b6b6b] focus:outline-none focus:border-[#b5692a] transition-colors appearance-none">
          <option>Todas categorias</option>
          {['Casa', 'Iluminação', 'Têxtil', 'Organização', 'Decoração'].map(c => <option key={c}>{c}</option>)}
        </select>
        <select className="h-9 bg-[#141414] border border-[#1e1e1e] px-3 text-[12px] text-[#6b6b6b] focus:outline-none focus:border-[#b5692a] transition-colors appearance-none">
          <option>Todos os status</option>
          <option>Ativo</option>
          <option>Inativo</option>
          <option>Estoque baixo</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#141414] border border-[#1e1e1e] overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_80px_100px_80px_80px_100px] gap-4 px-6 py-3 border-b border-[#1e1e1e]">
          {['Produto', 'SKU', 'Preço', 'Estoque', 'Status', 'Ações'].map(h => (
            <span key={h} className="text-[9px] tracking-[0.25em] uppercase text-[#6b6b6b]">{h}</span>
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-[#1e1e1e]">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-[1fr_80px_100px_80px_80px_100px] gap-4 px-6 py-4 items-center hover:bg-[#1a1a1a] transition-colors"
            >
              {/* Product */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 bg-[#0a0a0a] border border-[#1e1e1e] shrink-0 flex items-center justify-center">
                  <div className="w-3 h-3 border border-[#2a2a2a]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] text-[#d4cfc6] truncate">{p.name}</p>
                  <p className="text-[10px] text-[#6b6b6b]">{p.category}</p>
                </div>
              </div>

              {/* SKU */}
              <span className="text-[11px] font-mono text-[#6b6b6b]">{p.sku}</span>

              {/* Price */}
              <span className="text-[12px] text-[#d4cfc6]">{formatPrice(p.price)}</span>

              {/* Stock */}
              <span className={`text-[12px] font-medium ${
                p.stock === 0 ? 'text-[#e24b4a]'
                : p.stock <= 3 ? 'text-[#d4843c]'
                : 'text-[#6a9e5a]'
              }`}>
                {p.stock === 0 ? 'Esgotado' : `${p.stock} un.`}
              </span>

              {/* Status */}
              <div>
                <span className={`text-[9px] tracking-widest uppercase px-2 py-1 ${
                  p.active
                    ? 'text-[#6a9e5a] bg-[#3b6d11]/15'
                    : 'text-[#6b6b6b] bg-[#2a2a2a]/50'
                }`}>
                  {p.active ? 'Ativo' : 'Inativo'}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/products/${p.id}/edit`}
                  className="text-[10px] text-[#6b6b6b] hover:text-[#d4843c] transition-colors"
                >
                  Editar
                </Link>
                <span className="text-[#1e1e1e]">|</span>
                <button className="text-[10px] text-[#6b6b6b] hover:text-[#e24b4a] transition-colors">
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-5">
        <p className="text-[11px] text-[#6b6b6b]">
          Mostrando 1–{PRODUCTS.length} de {PRODUCTS.length} produtos
        </p>
        <div className="flex gap-1">
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              className={`w-8 h-8 text-[11px] border transition-colors ${
                p === 1
                  ? 'border-[#b5692a] text-[#d4843c] bg-[#b5692a]/10'
                  : 'border-[#1e1e1e] text-[#6b6b6b] hover:border-[#b5692a]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
