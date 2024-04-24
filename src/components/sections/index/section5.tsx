import Container from '@/components/common/container'
import Section from '@/components/common/section'
import SectionHeader from '@/components/common/section-header'
import Image, { ServerImage } from '@/components/ui/image'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { getDictionary } from '@/i18n/get-dictionary'
import { Locale, PropsWithLang } from '@/i18n/types'
import { serverFetcher } from '@/lib/server-fetcher'
import { getTranslationOfList } from '@/utils/translations-utils'

export default async function Section5({ lang }: PropsWithLang) {
  const {
    index: {
      section5: { title },
    },
  } = await getDictionary(lang)

  const blogPosts = await getStaticBlogPosts({
    lang,
  })

  if (!blogPosts || blogPosts?.length < 1) return null

  return (
    <div
      className="bg-foreground"
      style={{
        background: `url('images/hero-image.png')`,
        minHeight: '500px',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Container>
        <Section className="relative">
          <div className="py-5">
            <SectionHeader className="text-center text-white">
              {title}
            </SectionHeader>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <FeaturedBlogPostCard {...blogPosts[0]} lang={lang} />
            <div className="grid md:grid-cols-2 gap-5 auto-rows-fr">
              {blogPosts.slice(1).map((blogPost) => (
                <BlogPostCard key={blogPost.id} {...blogPost} lang={lang} />
              ))}
            </div>
          </div>
        </Section>
      </Container>
    </div>
  )
}

function FeaturedBlogPostCard({
  id,
  featuredImage,
  translation: { title, excerpt, slug },
  categories,
  lang,
}: BlogPostWithOneTranslation & PropsWithLang) {
  return (
    <Link href={`/blog/${id}/${slug}`} lang={lang}>
      <div className="text-white mb-5">
        <div>
          <ServerImage
            className="w-full object-cover aspect-video"
            src={featuredImage?.path || ''}
            width={500}
            height={500}
            alt={featuredImage?.alt || ''}
          />
        </div>
        {categories?.length && categories?.length > 0 ? (
          <Typography
            as="h5"
            className="text-lg font-normal py-1 text-gray-100 "
          >
            {categories[0].translation.name}
          </Typography>
        ) : null}
        <Typography as="h4" className="text-2xl pb-2 font-semibold">
          {title}
        </Typography>
        <Typography as="p" className="text-lg">
          {excerpt}
        </Typography>
      </div>
    </Link>
  )
}

function BlogPostCard({
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
        <Typography
          as="h4"
          className="text-md md:text-lg pb-5 font-semibold font-[500]"
        >
          {title}
        </Typography>
      </div>
    </Link>
  )
}

async function getStaticBlogPosts({ lang }: { lang: Locale }) {
  const { data } = await serverFetcher('/blog-posts/all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      where: {
        id: {
          in: [2, 3, 4, 5, 6],
        },
      },
      include: {
        featuredImage: true,
        translations: {
          include: {
            locale: true,
          },
        },
        categories: {
          include: {
            translations: {
              include: {
                locale: true,
              },
            },
          },
        },
      },
    }),
  })

  return [
    ...getTranslationOfList<BlogPostWithOneTranslation>(lang, data.data).map(
      (item) => ({
        ...item,
        categories: getTranslationOfList<BlogPostCategoryWithOneTranslation>(
          lang,
          item.categories as any
        ),
      })
    ),
  ] as BlogPostWithOneTranslation[]
}
