import Typography from '../ui/typography'
import { PropsWithLang } from '@/i18n/types'
import { getDictionaryV2 } from '@/i18n/get-dictionary'
import { BlogPostCard } from './blog-post-card'

interface BlogCardListProps extends PropsWithLang {
  blogPostList: BlogPost[]
}

export default async function BlogCardList({
  blogPostList,
  lang,
}: BlogCardListProps) {
  const dict = await getDictionaryV2(lang)

  return (
    <div>
      <Typography
        as="h3"
        className="text-center py-10 text-xl lg:text-3xl text-white"
      >
        {dict.about.keep_up_to_date_text}
      </Typography>
      <div className="grid lg:grid-cols-4 gap-10">
        {blogPostList.slice(0, 4).map((blogPost, i) => (
          <BlogPostCard key={blogPost.id} {...blogPost} lang={lang} />
        ))}
      </div>
    </div>
  )
}
