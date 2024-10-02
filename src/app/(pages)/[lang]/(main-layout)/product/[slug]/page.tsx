import { serverUrl } from '@/config/get-env-fields'
import SingleProductPage from '@/features/product/pages/single-product-page'
import i18n from '@/i18n'
import { Locale } from '@/i18n/types'
import { getProperLanguage } from '@/i18n/utils'
import { serverFetcher } from '@/lib/server-fetcher'
import { sdk } from '@/restoreplus-sdk'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slug = params.slug
  const lang = params.lang
  const properLang = getProperLanguage(lang)

  const product = await sdk.products.getSingleByQuery(
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

  const { data } = await serverFetcher(`/products/single/${product?.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      select: {
        translations: {
          include: {
            locale: true,
          },
        },
      },
    }),
  })

  const localesData = await sdk.supportedLocales.getAllByQuery({
    where: { locale: { not: i18n.defaultLocale } },
  })
  const languages = localesData.data.map((locale: any) => locale.locale)
  const alternateLangs = Object.fromEntries(
    languages.map((lang: SupportedLocale) => [
      lang,
      `${serverUrl}/${lang}/product/${
        data?.translations.find((item: any) => item.locale.locale === lang)
          ?.slug
      }`,
    ])
  )

  const canonicalUrl =
    properLang === i18n.defaultLocale
      ? `${serverUrl}/product/${product?.translation?.slug}`
      : `${serverUrl}/${lang}/product/${product?.translation?.slug}`

  return {
    title: product?.translation?.metaTitle,
    description: product?.translation?.metaDescription,
    keywords: product?.translation?.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLangs,
    },
  }
}

export default function Page({
  params: { id, lang, slug },
  searchParams: { redirectBack },
}: {
  params: { id: string; lang: Locale; slug: string }
  searchParams: { redirectBack?: string }
}) {
  return (
    <SingleProductPage
      lang={lang}
      id={id}
      redirectBackSearchParam={redirectBack}
      slug={slug}
    />
  )
}
