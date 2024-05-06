import { ServerImage } from '@/components/ui/image'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { PropsWithLang } from '@/i18n/types'

export function BlogPostCard({
  id,
  featuredImage,
  translation: { title, slug },
  categories,
  lang,
}: BlogPostWithOneTranslation & PropsWithLang) {
  return (
    <Link href={`/blog/${id}/${slug}`} lang={lang}>
      <div className="text-white mb-5">
        <div>
          <ServerImage
            className="object-cover aspect-video"
            src={featuredImage?.path || ''}
            width={500}
            height={500}
            alt={featuredImage?.alt || ''}
          />
        </div>
        {categories?.length && categories?.length > 0 ? (
          <Typography
            as="h5"
            className="text-sm md:text-md font-normal py-1 text-gray-100 capitalize"
          >
            {categories[0].translation.name}
          </Typography>
        ) : null}
        <div className="pb-5">
          <Typography
            as="h4"
            className="text-md md:text-lg font-[500]"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Typography>
        </div>
      </div>
    </Link>
  )
}
