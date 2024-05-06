import SingleCategoryPage from '@/features/product-categories/components/single-category-page'
import { getCategoryById } from '@/features/product-categories/data/get-category-by-id'
import { Locale } from '@/i18n/types'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = params.id
  const lang = params.lang

  const category = await getCategoryById(id, lang)

  return {
    title: category?.translation?.metaTitle,
    description: category?.translation?.metaDescription,
  }
}

export default function Page({
  params: { id, slug, lang },
}: {
  params: { id: string; slug: string; lang: Locale }
}) {
  return <SingleCategoryPage lang={lang} id={id} slug={slug} />
}
