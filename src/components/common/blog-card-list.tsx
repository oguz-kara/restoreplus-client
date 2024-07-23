import Typography from '../ui/typography'
import { PropsWithLang } from '@/i18n/types'
import { getDictionary } from '@/i18n/get-dictionary'
import { BlogPostCard } from './blog-post-card'

interface BlogCardListProps extends PropsWithLang {
  blogPostList: BlogPost[]
}

export default async function BlogCardList({
  blogPostList,
  lang,
}: BlogCardListProps) {
  const {
    blog: { blogCards },
  } = await getDictionary(lang)

  return (
    <div>
      <Typography
        as="h3"
        className="text-center py-10 text-xl lg:text-3xl text-white"
      >
        {blogCards.title}
      </Typography>
      <div className="grid lg:grid-cols-4 gap-10">
        {blogPostList.slice(0, 4).map((blogPost, i) => (
          <BlogPostCard key={blogPost.id} {...blogPost} lang={lang} />
        ))}
      </div>
    </div>
  )
}
