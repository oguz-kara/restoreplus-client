import ProductFinderPage from '@/features/product/pages/product-finder-page'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
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

  const seoData = await getSeoPageByPathnameAndLocale('/product/finder', lang)

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
}: SearchParamsWithPagination & ParamsWithLang & ProductFinderSearchParams) {
  return (
    <ProductFinderPage
      page={page as string}
      take={take as string}
      lang={lang}
      categorySlug={categorySlug}
      sectorSlug={sectorSlug}
      subCategorySlug={subCategorySlug}
      subSectorSlug={subSectorSlug}
      term={term}
    />
  )
}
