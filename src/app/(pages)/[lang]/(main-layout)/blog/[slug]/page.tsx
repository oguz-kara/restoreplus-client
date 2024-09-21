import { serverUrl } from '@/config/get-env-fields'
import SingleBlogPage from '@/features/blog/pages/single-blog-page'
import i18n from '@/i18n'
import { ParamsWithLang } from '@/i18n/types'
import { getProperLanguage } from '@/i18n/utils'
import { serverFetcher } from '@/lib/server-fetcher'
import { sdk } from '@/restoreplus-sdk'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slug = params.slug
  const lang = params.lang
  const properLang = getProperLanguage(lang)

  const blog = await sdk.blogPosts.getSingleByQuery(
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

  const { data } = await serverFetcher(`/blog-posts/single/${blog?.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      include: {
        translations: {
          include: {
            locale: true,
          },
        },
      },
    }),
  })

  const localesData = await sdk.supportedLocales.getAll()
  const languages = localesData.data.map((locale: any) => locale.locale)
  const alternateLangs = Object.fromEntries(
    languages.map((lang: SupportedLocale) => [
      lang,
      `${serverUrl}/${lang}/blog/${
        data?.translations.find((item: any) => item.locale.locale === lang)
          ?.slug
      }`,
    ])
  )

  // just to commit

  const canonicalUrl =
    properLang === i18n.defaultLocale
      ? `${serverUrl}/blog/${blog?.translation?.slug}`
      : `${serverUrl}/${lang}/blog/${blog?.translation?.slug}`

  return {
    title: blog?.translation?.metaTitle,
    description: blog?.translation?.metaDescription,
    keywords: blog?.translation?.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLangs,
    },
  }
}

export default function Page({
  params: { lang, slug },
}: ParamsWithLang & { params: { slug: string } }) {
  return <SingleBlogPage lang={lang} slug={slug} />
}
