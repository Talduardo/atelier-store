import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const { code, total } = await req.json()

  if (!code || !total) {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 })
  }

  const supabase = await createClient()

  const { data, error } = await supabase.rpc('apply_coupon', {
    p_code: code.toUpperCase(),
    p_order_total: total,
  })

  if (error) {
    return NextResponse.json({ error: 'Erro ao validar cupom.' }, { status: 500 })
  }

  if (data?.error) {
    return NextResponse.json({ error: data.error }, { status: 400 })
  }

  return NextResponse.json(data)
}
