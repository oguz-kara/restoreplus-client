import BlogPage from '@/features/blog/pages/blog-page'
import { ParamsWithLang } from '@/i18n/types'

export default function Page({ params: { lang } }: ParamsWithLang) {
  return <BlogPage lang={lang} />
}
