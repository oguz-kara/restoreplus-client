import { getCategoryById } from '@/features/product-categories/data/get-category-by-id'
import { Locale } from '@/i18n/types'
import { getProperLanguage } from '@/i18n/utils'
import { sdk } from '@/restoreplus-sdk'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id')
  const lang = req.nextUrl.searchParams.get('lang')
  const properLang = getProperLanguage(lang as any)

  if (!id) throw new Error('no id provided to get product category!')

  const data = await getCategoryById(id, properLang as any)

  return NextResponse.json(data)
}

export const POST = async (req: NextRequest) => {
  const lang = req.nextUrl.searchParams.get('lang')
  const properLang = getProperLanguage(lang as Locale)
  const id = req.nextUrl.searchParams.get('id')

  const data = await sdk.productCategories.getSingleByQuery(
    {
      where: {
        id: Number(id),
      },
      select: {
        subCategories: {
          select: {
            id: true,
            translations: {
              where: {
                locale: {
                  locale: properLang,
                },
              },
              select: {
                name: true,
                locale: {
                  select: {
                    locale: true,
                  },
                },
              },
            },
          },
        },
      },
    },
    { lang }
  )

  return NextResponse.json(data?.subCategories)
}
