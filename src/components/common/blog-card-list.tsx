import serverConfig from '@/config/server-config.json'
import Image from '../ui/image'
import Typography from '../ui/typography'
import Link from '../ui/link'
import { PropsWithLang } from '@/i18n/types'
import { getDictionary } from '@/i18n/get-dictionary'

interface BlogCardListProps extends PropsWithLang {
  blogPostList: BlogPostWithOneTranslation[]
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
      <Typography as="h3" className="text-center py-10 text-3xl">
        {blogCards.title}
      </Typography>
      <div className="grid lg:grid-cols-4 gap-10">
        {blogPostList.slice(0, 4).map((blogPost, i) => (
          <div key={i}>
            <Link lang={lang} href={`/${blogPost.translation.slug}`}>
              <div className="mb-3">
                <Image
                  src={`${serverConfig.remoteUrl}${blogPost.featuredImage?.path}`}
                  alt={
                    blogPost.featuredImage?.alt
                      ? blogPost.featuredImage.alt
                      : ''
                  }
                  width={500}
                  height={500}
                />
              </div>
              <div>
                <Typography as="h5" className="mb-3">
                  {blogPost.categories?.length &&
                    blogPost.categories?.length > 1 &&
                    blogPost.categories[0].translation.name}
                </Typography>
                <Typography as="h3" className="mb-3">
                  {blogPost.translation.title}
                </Typography>
                <Typography as="p">{blogPost.translation.excerpt}</Typography>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
