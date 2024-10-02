import { serverUrl } from '@/config/get-env-fields'
import SingleCategoryPage from '@/features/product-categories/components/single-category-page'
import i18n, { SupportedLocale } from '@/i18n'
import { Locale } from '@/i18n/types'
import { getProperLanguage } from '@/i18n/utils'
import { serverFetcher } from '@/lib/server-fetcher'
import { sdk } from '@/restoreplus-sdk'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slug = params.slug
  const lang = params.lang
  const properLang = getProperLanguage(lang)

  const category = await sdk.productCategories.getSingleByQuery(
    {
      where: {
        translations: {
          some: {
            slug,
            locale: {
              locale: properLang,
            },
          },
        },
      },
    },
    { lang }
  )

  const { data } = await serverFetcher(
    `/products/categories/single/${category?.id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }
  )

  const localesData = await sdk.supportedLocales.getAllByQuery({
    where: { locale: { not: i18n.defaultLocale } },
  })
  const languages = localesData.data.map((locale: any) => locale.locale)
  const alternateLangs = Object.fromEntries(
    languages.map((lang: SupportedLocale) => [
      lang,
      `${serverUrl}/${lang}/product/categories/${
        data?.translations.find((item: any) => item.locale.locale === lang)
          ?.slug
      }`,
    ])
  )

  const canonicalUrl =
    properLang === i18n.defaultLocale
      ? `${serverUrl}/product/categories/${category?.translation?.slug}`
      : `${serverUrl}/${lang}/product/categories/${category?.translation?.slug}`

  return {
    title: category?.translation?.metaTitle,
    description: category?.translation?.metaDescription,
    keywords: category?.translation?.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLangs,
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
