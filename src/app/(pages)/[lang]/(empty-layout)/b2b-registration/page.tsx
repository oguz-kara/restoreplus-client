import B2bRegistrationPage from '@/features/b2b/pages/b2b-registration-page'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { ParamsWithLang } from '@/i18n/types'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale('/b2b-registration', lang)

  return seoData
}

export default function Page({
  params: { lang },
  searchParams: { token },
}: ParamsWithLang & { searchParams: { token: string } }) {
  return <B2bRegistrationPage lang={lang} token={token} />
}
