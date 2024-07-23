import Container from '@/components/common/container'
import Section from '@/components/common/section'
import SectionHeader from '@/components/common/section-header'
import { ServerImage } from '@/components/ui/image'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { getDictionary } from '@/i18n/get-dictionary'
import { Locale, PropsWithLang } from '@/i18n/types'
import bg from '../../../../public/images/hero-image.png'
import { BlogPostCard } from '@/components/common/blog-post-card'
import { sdk } from '@/restoreplus-sdk'

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
      className="bg-foreground pb-20"
      style={{
        background: `url(${bg.src})`,
        minHeight: '500px',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Container>
        <Section className="relative">
          <div>
            <SectionHeader className="text-center text-white py-10">
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
  translation: { title, description, slug },
  categories,
  lang,
}: BlogPost & PropsWithLang) {
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
          {description}
        </Typography>
      </div>
    </Link>
  )
}

export async function getStaticBlogPosts({ lang }: { lang: Locale }) {
  const query = {
    where: {
      id: {
        in: [1, 2, 3, 4, 5],
      },
    },
    select: {
      id: true,
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
  }

  const { data } = await sdk.blogPosts.getAllByQuery(query, { lang })

  return data as BlogPost[]
}
