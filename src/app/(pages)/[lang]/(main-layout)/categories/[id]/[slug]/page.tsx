import { getSingleCategoryById } from '@/features/categories/data/get-single-category-with-id'
import SingleCategoryPage from '@/features/categories/pages/single-category-page'
import { Locale } from '@/i18n/types'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = params.id
  const lang = params.lang

  const category = await getSingleCategoryById(id, lang)

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
  return <SingleCategoryPage lang={lang} id={id} />
}
