import Link from 'next/link'
import { getAdminProducts } from '@/lib/queries/products'
import { getCategories } from '@/lib/queries/categories'
import { formatPrice } from '@/lib/utils'

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    getAdminProducts(),
    getCategories(),
  ])

  return (
    <div className="p-8 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-light text-[#f5f0e8]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>Produtos</h1>
          <p className="text-[12px] text-[#6b6b6b]">{products.length} produtos cadastrados</p>
        </div>
        <Link href="/admin/products/new"
          className="h-9 px-5 bg-[#b5692a] text-[#f5f0e8] text-[11px] tracking-[0.15em] uppercase hover:bg-[#d4843c] transition-colors flex items-center gap-2">
          + Adicionar produto
        </Link>
      </div>

      <div className="bg-[#141414] border border-[#1e1e1e] overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_100px_100px_80px_80px_100px] gap-4 px-6 py-3 border-b border-[#1e1e1e]">
          {['Produto', 'SKU', 'Preço', 'Estoque', 'Status', 'Ações'].map(h => (
            <span key={h} className="text-[9px] tracking-[0.25em] uppercase text-[#6b6b6b]">{h}</span>
          ))}
        </div>

        {products.length === 0 ? (
          <div className="px-6 py-16 text-center text-[12px] text-[#6b6b6b]">
            Nenhum produto cadastrado.{' '}
            <Link href="/admin/products/new" className="text-[#b5692a] hover:text-[#d4843c]">Criar primeiro produto</Link>
          </div>
        ) : (
          <div className="divide-y divide-[#1e1e1e]">
            {products.map((p) => (
              <div key={p.id}
                className="grid grid-cols-[1fr_100px_100px_80px_80px_100px] gap-4 px-6 py-4 items-center hover:bg-[#1a1a1a] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 bg-[#0a0a0a] border border-[#1e1e1e] shrink-0 overflow-hidden">
                    {p.images?.[0]
                      ? <img src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${p.images[0]}`}
                          alt={p.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center"><div className="w-3 h-3 border border-[#2a2a2a]" /></div>
                    }
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] text-[#d4cfc6] truncate">{p.name}</p>
                    <p className="text-[10px] text-[#6b6b6b]">{p.category?.name ?? '—'}</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[#6b6b6b]">{p.sku}</span>
                <span className="text-[12px] text-[#d4cfc6]">{formatPrice(p.price)}</span>
                <span className={`text-[12px] font-medium ${p.stock === 0 ? 'text-[#e24b4a]' : p.stock <= 3 ? 'text-[#d4843c]' : 'text-[#6a9e5a]'}`}>
                  {p.stock === 0 ? 'Esgotado' : `${p.stock} un.`}
                </span>
                <div>
                  <span className={`text-[9px] tracking-widest uppercase px-2 py-1 ${p.is_active ? 'text-[#6a9e5a] bg-[#3b6d11]/15' : 'text-[#6b6b6b] bg-[#2a2a2a]/50'}`}>
                    {p.is_active ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/products/${p.id}/edit`}
                    className="text-[10px] text-[#6b6b6b] hover:text-[#d4843c] transition-colors">
                    Editar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
