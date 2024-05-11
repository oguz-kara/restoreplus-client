import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import CreateOrderPage from '@/features/user/pages/create-order-page'
import { ParamsWithLang } from '@/i18n/types'
import { Metadata } from 'next'

interface ProductFinderSearchParams {
  searchParams: {
    categorySlug?: string
    sectorSlug?: string
    subCategorySlug?: string
    subSectorSlug?: string
    term?: string
  }
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale('/create-order', lang)

  return seoData
}

export default function Page({
  params: { lang },
  searchParams: {
    categorySlug,
    sectorSlug,
    subCategorySlug,
    subSectorSlug,
    term,
    page,
    take,
  },
}: ProductFinderSearchParams & ParamsWithLang & SearchParamsWithPagination) {
  return (
    <CreateOrderPage
      lang={lang}
      term={term}
      categorySlug={categorySlug}
      sectorSlug={sectorSlug}
      subCategorySlug={subCategorySlug}
      subSectorSlug={subSectorSlug}
      page={page as string}
      take={take as string}
    />
  )
}
