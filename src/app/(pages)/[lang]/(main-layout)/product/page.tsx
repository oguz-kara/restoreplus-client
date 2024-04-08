import ListProductsPage from '@/features/product/pages/list-products-page'
import { getDictionary } from '@/i18n/get-dictionary'
import { Locale, ParamsWithLang } from '@/i18n/types'
import { getProperLanguage } from '@/i18n/utils'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang
  const properLang = getProperLanguage(lang)
  const {
    productCollection: { meta },
  } = await getDictionary(properLang as Locale)

  return {
    title: meta.title,
    description: meta.description,
  }
}

export default function Page({
  params: { lang },
  searchParams: { page, take, q, type },
}: ParamsWithLang & {
  searchParams: { page: string; take: string; q: string; type: string }
}) {
  return (
    <ListProductsPage lang={lang} page={page} take={take} q={q} type={type} />
  )
}
