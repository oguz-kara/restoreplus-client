import { PropsWithLang } from '@/i18n/types'
import MainBlogCard from './main-blog-card'

export default async function MainBlogList({
  lang,
  data,
}: PropsWithLang & { data: BlogPost[] }) {
  return (
    <div className="flex-[3]">
      {data.map((item, i) => (
        <MainBlogCard key={i} data={item} lang={lang} />
      ))}
    </div>
  )
}
