import { serverUrl } from '@/config/get-env-fields'
import SingleBlogPage from '@/features/blog/pages/single-blog-page'
import { ParamsWithLang } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slug = params.slug
  const lang = params.lang

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

  const localesData = await sdk.supportedLocales.getAll()
  const languages = localesData.data.map((locale: any) => locale.locale)
  const alternateLangs = Object.fromEntries(
    languages.map((lang: SupportedLocale) => [
      lang,
      `${serverUrl}/${lang}/blog/${blog?.translation?.slug}`,
    ])
  )

  const canonicalUrl = `${serverUrl}/blog/${blog?.translation?.slug}`

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
