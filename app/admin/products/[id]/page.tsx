'use client'

import { useState, useTransition, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { updateProduct, deleteProduct, uploadProductImage } from '@/lib/actions/products'
import { getProductImageUrl } from '@/lib/utils'

interface Category { id: string; name: string }
interface Product {
  id: string; name: string; description: string | null
  price: number; original_price: number | null
  stock: number; category_id: string | null
  sku: string | null; is_active: boolean; is_featured: boolean
  images: string[]
  category?: { id: string; name: string } | null
}

export default function EditProductPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/products/${id}`).then(r => r.json()),
      fetch('/api/categories').then(r => r.json()),
    ]).then(([prod, cats]) => {
      setProduct(prod)
      setCategories(cats)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [id])

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await updateProduct(id, formData)
      if (result?.error) { setError(result.error); return }
      if (imageFile) {
        const imgForm = new FormData()
        imgForm.append('image', imageFile)
        await uploadProductImage(id, imgForm)
      }
      router.push('/admin/products')
    })
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteProduct(id)
      router.push('/admin/products')
    })
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <div className="w-6 h-6 border border-[#b5692a] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="p-8">
        <p className="text-[#6b6b6b]">Produto não encontrado.</p>
        <Link href="/admin/products" className="text-[#b5692a] text-[12px] mt-2 inline-block">← Voltar</Link>
      </div>
    )
  }

  const currentImage = product.images?.[0] ? getProductImageUrl(product.images[0]) : null

  return (
    <div className="p-8 lg:p-10 max-w-3xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <Link href="/admin/products" className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] hover:text-[#d4843c] transition-colors flex items-center gap-2 mb-3">
            ← Voltar para produtos
          </Link>
          <h1 className="text-[28px] font-light text-[#f5f0e8]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Editar produto
          </h1>
          <p className="text-[11px] text-[#6b6b6b] mt-1 font-mono">{product.sku}</p>
        </div>
        <button onClick={() => setShowDeleteConfirm(true)}
          className="h-9 px-4 border border-[#e24b4a]/30 text-[#e24b4a] text-[10px] tracking-[0.15em] uppercase hover:bg-[#e24b4a]/10 transition-all">
          Remover
        </button>
      </div>

      {/* Delete confirm */}
      {showDeleteConfirm && (
        <div className="mb-6 p-4 border border-[#e24b4a]/30 bg-[#e24b4a]/5">
          <p className="text-[13px] text-[#f5f0e8] mb-3">Tem certeza que deseja desativar este produto?</p>
          <div className="flex gap-3">
            <button onClick={handleDelete} disabled={isPending}
              className="h-8 px-5 bg-[#e24b4a] text-white text-[10px] tracking-[0.15em] uppercase hover:bg-[#c73a39] transition-colors disabled:opacity-60">
              Sim, remover
            </button>
            <button onClick={() => setShowDeleteConfirm(false)}
              className="h-8 px-5 border border-[#2a2a2a] text-[#6b6b6b] text-[10px] uppercase hover:text-[#f5f0e8] transition-colors">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 px-4 py-3 border border-[#e24b4a]/30 bg-[#e24b4a]/5 text-[#e24b4a] text-[12px]">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Image */}
        <div className="bg-[#141414] border border-[#1e1e1e] p-6">
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-[#b5692a] mb-4">Imagem</h2>
          <div className="flex items-start gap-6">
            <div className="w-32 aspect-square bg-[#0a0a0a] border border-[#2a2a2a] flex items-center justify-center overflow-hidden shrink-0">
              {imagePreview || currentImage
                ? <img src={imagePreview ?? currentImage!} alt="Preview" className="w-full h-full object-cover" />
                : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#2a2a2a]"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              }
            </div>
            <div>
              <label className="cursor-pointer inline-flex items-center gap-2 h-9 px-5 border border-[#2a2a2a] text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] hover:border-[#b5692a] hover:text-[#d4843c] transition-all">
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                {currentImage ? 'Trocar imagem' : 'Selecionar imagem'}
              </label>
              {imageFile && <p className="text-[11px] text-[#6a9e5a] mt-2">✓ {imageFile.name}</p>}
            </div>
          </div>
        </div>

        {/* Basic info */}
        <div className="bg-[#141414] border border-[#1e1e1e] p-6 space-y-4">
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-[#b5692a] mb-2">Informações básicas</h2>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">Nome *</label>
            <input type="text" name="name" required defaultValue={product.name}
              className="w-full h-10 bg-[#0a0a0a] border border-[#2a2a2a] px-3 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">Descrição</label>
            <textarea name="description" rows={4} defaultValue={product.description ?? ''}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] px-3 py-2 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">SKU *</label>
              <input type="text" name="sku" required defaultValue={product.sku ?? ''}
                className="w-full h-10 bg-[#0a0a0a] border border-[#2a2a2a] px-3 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">Categoria</label>
              <select name="category_id" defaultValue={product.category_id ?? ''}
                className="w-full h-10 bg-[#0a0a0a] border border-[#2a2a2a] px-3 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors appearance-none">
                <option value="">Sem categoria</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-[#141414] border border-[#1e1e1e] p-6 space-y-4">
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-[#b5692a] mb-2">Preço e estoque</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">Preço (R$) *</label>
              <input type="number" name="price" required min="0" step="0.01" defaultValue={product.price}
                className="w-full h-10 bg-[#0a0a0a] border border-[#2a2a2a] px-3 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">Preço original (R$)</label>
              <input type="number" name="original_price" min="0" step="0.01" defaultValue={product.original_price ?? ''}
                className="w-full h-10 bg-[#0a0a0a] border border-[#2a2a2a] px-3 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-2">Estoque *</label>
              <input type="number" name="stock" required min="0" defaultValue={product.stock}
                className="w-full h-10 bg-[#0a0a0a] border border-[#2a2a2a] px-3 text-[13px] text-[#f5f0e8] focus:outline-none focus:border-[#b5692a] transition-colors" />
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="bg-[#141414] border border-[#1e1e1e] p-6">
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-[#b5692a] mb-4">Opções</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="is_active" value="true" defaultChecked={product.is_active} className="w-4 h-4 accent-[#b5692a]" />
              <span className="text-[13px] text-[#d4cfc6]">Produto ativo (visível na loja)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="is_featured" value="true" defaultChecked={product.is_featured} className="w-4 h-4 accent-[#b5692a]" />
              <span className="text-[13px] text-[#d4cfc6]">Produto em destaque</span>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button type="submit" disabled={isPending}
            className="h-11 px-10 bg-[#b5692a] text-[#f5f0e8] text-[11px] tracking-[0.2em] uppercase hover:bg-[#d4843c] transition-colors disabled:opacity-60">
            {isPending ? 'Salvando...' : 'Salvar alterações'}
          </button>
          <Link href="/admin/products" className="h-11 px-6 border border-[#2a2a2a] text-[#6b6b6b] text-[11px] tracking-[0.2em] uppercase hover:border-[#b5692a] hover:text-[#d4843c] transition-all flex items-center">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
