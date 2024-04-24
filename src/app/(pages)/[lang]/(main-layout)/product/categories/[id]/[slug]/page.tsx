import SingleCategoryPage from '@/features/product-categories/components/single-category-page'
import { Locale } from '@/i18n/types'

export default function Page({
  params: { id, slug, lang },
}: {
  params: { id: string; slug: string; lang: Locale }
}) {
  return <SingleCategoryPage lang={lang} id={id} slug={slug} />
}
