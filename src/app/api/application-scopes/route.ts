import { Locale } from '@/i18n/types'
import { getProperLanguage } from '@/i18n/utils'
import { sdk } from '@/restoreplus-sdk'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const lang = req.nextUrl.searchParams.get('lang')
  const properLang = getProperLanguage(lang as Locale)
  const id = req.nextUrl.searchParams.get('id')
  const { sectorId } = await req.json()

  const { data } = await sdk.applicationScopes.getAllByQuery(
    {
      where: {
        sectors: {
          some: {
            id: sectorId,
          },
        },
      },
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
    { lang }
  )

  return NextResponse.json(data)
}
