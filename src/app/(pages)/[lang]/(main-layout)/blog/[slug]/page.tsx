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

  const canonicalUrl = `${serverUrl}/${lang}/blog/${blog?.translation?.slug}`

  return {
    title: blog?.translation?.metaTitle,
    description: blog?.translation?.metaDescription,
    keywords: blog?.translation?.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default function Page({
  params: { lang, slug },
}: ParamsWithLang & { params: { slug: string } }) {
  return <SingleBlogPage lang={lang} slug={slug} />
}
