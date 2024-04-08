import ProductFinderPage from '@/features/product/pages/product-finder-page'
import { ParamsWithLang } from '@/i18n/types'

interface ProductFinderSearchParams {
  searchParams: {
    categorySlug?: string
    sectorSlug?: string
    subCategorySlug?: string
    subSectorSlug?: string
    term?: string
  }
}

export default function Page({
  params: { page, take, lang },
  searchParams: {
    categorySlug,
    sectorSlug,
    subCategorySlug,
    subSectorSlug,
    term,
  },
}: ParamsWithPagination & ParamsWithLang & ProductFinderSearchParams) {
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
