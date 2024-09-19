import { serverUrl } from '@/config/get-env-fields'
import SingleCategoryPage from '@/features/product-categories/components/single-category-page'
import { Locale } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slug = params.slug
  const lang = params.lang

  const category = await sdk.productCategories.getSingleByQuery(
    {
      where: {
        translations: {
          some: {
            slug,
          },
        },
      },
    },
    { lang }
  )

  const canonicalUrl = `${serverUrl}/${lang}/product/categories/${category?.translation?.slug}`

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
  params: { slug, lang },
}: {
  params: { slug: string; lang: Locale }
}) {
  return <SingleCategoryPage lang={lang} slug={slug} />
}
