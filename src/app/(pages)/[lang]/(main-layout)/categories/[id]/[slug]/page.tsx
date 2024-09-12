import { serverUrl } from '@/config/get-env-fields'
import SingleCategoryPage from '@/features/categories/pages/single-category-page'
import { Locale } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = params.id
  const lang = params.lang

  const category = await sdk.blogPostCategories.getById(Number(id), { lang })
  const canonicalUrl = `${serverUrl}/${lang}/categories/${id}/${category?.translation?.slug}`

  return {
    title: category?.translation?.metaTitle,
    description: category?.translation?.metaDescription,
    keywords: category?.translation?.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default function Page({
  params: { id, slug, lang },
}: {
  params: { id: string; slug: string; lang: Locale }
}) {
  return <SingleCategoryPage lang={lang} id={id} />
}
