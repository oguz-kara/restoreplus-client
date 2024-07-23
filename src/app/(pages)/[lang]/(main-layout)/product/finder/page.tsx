import ProductFinderPageV2 from '@/features/product/pages/product-finder-page-v2'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { ParamsWithLang } from '@/i18n/types'
import { Metadata } from 'next'

interface ProductFinderSearchParams {
  searchParams: {
    categoryId?: string
    sectorId?: string
    applicationScopeId?: string
    term?: string
  }
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang
  const seoData = await getSeoPageByPathnameAndLocale('/product/finder', lang)

  return seoData
}

export default function Page({
  params: { lang },
  searchParams,
}: SearchParamsWithPagination & ParamsWithLang & ProductFinderSearchParams) {
  return <ProductFinderPageV2 lang={lang} {...searchParams} />
}
