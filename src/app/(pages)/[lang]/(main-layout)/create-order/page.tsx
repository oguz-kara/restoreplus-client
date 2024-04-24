import CreateOrderPage from '@/features/user/pages/create-order-page'
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
}: ProductFinderSearchParams & ParamsWithLang & ParamsWithPagination) {
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
