import { getSingleBlogPostById } from '@/features/blog/data/get-single-blog-post'
import SingleBlogPage from '@/features/blog/pages/single-blog-page'
import { ParamsWithLang } from '@/i18n/types'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = params.id
  const lang = params.lang

  const blog = await getSingleBlogPostById(id, lang)

  return {
    title: blog?.translation?.metaTitle,
    description: blog?.translation?.metaDescription,
  }
}

export default function Page({
  params: { lang, id },
}: ParamsWithLang & { params: { id: string } }) {
  return <SingleBlogPage id={id} lang={lang} />
}
