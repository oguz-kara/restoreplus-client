import { getCategoryById } from '@/features/product-categories/data/get-category-by-id'
import { getProperLanguage } from '@/i18n/utils'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id')
  const lang = req.nextUrl.searchParams.get('lang')
  const properLang = getProperLanguage(lang as any)

  if (!id) throw new Error('no id provided to get product category!')

  const data = await getCategoryById(id, properLang as any)

  return NextResponse.json(data)
}