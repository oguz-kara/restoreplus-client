import SingleBlogPage from '@/features/blog/pages/single-blog-page'
import { ParamsWithLang } from '@/i18n/types'

export default function Page({
  params: { lang, id },
}: ParamsWithLang & { params: { id: string } }) {

  return <SingleBlogPage id={id} lang={lang} />
}
