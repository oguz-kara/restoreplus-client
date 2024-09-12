import { SupportedLocale } from '@/i18n'
import { getProperLanguage } from '@/i18n/utils'
import { sdk } from '@/restoreplus-sdk'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const lang = req.nextUrl.searchParams.get('lang') as SupportedLocale
    const properLang = getProperLanguage(lang as any) as SupportedLocale

    const dictionary = await sdk.dictionaries.getDictionary(properLang, {
      isAdmin: true,
    })

    return NextResponse.json(dictionary)
  } catch (err: any) {
    console.log({ err })

    return NextResponse.json({ message: 'an error occurred' }, { status: 500 })
  }
}
