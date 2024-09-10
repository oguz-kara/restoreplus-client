import CheckoutPage from '@/features/checkout/pages/checkout-page'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { ParamsWithLang } from '@/i18n/types'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale('/checkout', lang)

  return seoData
}

export default function Page({ params: { lang } }: ParamsWithLang) {
  return <CheckoutPage lang={lang} />
}
