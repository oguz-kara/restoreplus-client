import Container from '@/components/common/container'
import Section from '@/components/common/section'
import Image from '@/components/ui/image'
import Typography from '@/components/ui/typography'
import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'

interface FeaturedBlogPostCardData {
  title: string
  subtitle: string
  description: string
  image: {
    src: string
    alt: string
  }
}


const featuredBlogPostDummyData = {
  title: 'Engineering & Design',
  subtitle: 'Flying Sports Car Takes First Flight',
  description:
    'Restoreplus Lubricants: Empowering industrial efficiency and maximizing productivity for over 10 years. We offer a comprehensive range of high-performance lubricants formulated for your specific needs, built upon decades of industry expertise and relentless innovation.',
  image: {
    src: '/images/image-placeholder.png',
    alt: 'image placeholder',
  },
}

export default async function Section5({ lang }: PropsWithLang) {
  const {
    common: { learnMoreUs },
  } = await getDictionary(lang)

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
          <div className="grid lg:grid-cols-2 gap-10">
            <FeaturedBlogPostCard data={featuredBlogPostDummyData} />
            <BlogPostCard data={featuredBlogPostDummyData} />
          </div>
        </Section>
      </Container>
    </div>
  )
}

function FeaturedBlogPostCard({
  data: {
    title,
    subtitle,
    description,
    image: { src, alt },
  },
}: {
  data: FeaturedBlogPostCardData
}) {
  return (
    <div className="text-white mb-5">
      <div>
        <Image
          className="max-h-[200px] object-cover"
          src={src}
          width={500}
          height={500}
          alt={alt}
        />
      </div>
      <Typography as="h5" className="text-md font-normal py-5 text-gray-200 ">
        {title}
      </Typography>
      <Typography as="h4" className="text-lg pb-5 font-semibold">
        {subtitle}
      </Typography>
      <Typography as="p">{description}</Typography>
    </div>
  )
}

function BlogPostCard({
  data: {
    title,
    subtitle,
    image: { src, alt },
  },
}: {
  data: FeaturedBlogPostCardData
}) {
  return (
    <div className="text-white mb-5">
      <div>
        <Image
          className="max-h-[200px] object-cover"
          src={src}
          width={500}
          height={500}
          alt={alt}
        />
      </div>
      <Typography as="h5" className="text-md font-normal py-5 text-gray-200 ">
        {title}
      </Typography>
      <Typography as="h4" className="text-lg pb-5 font-semibold">
        {subtitle}
      </Typography>
    </div>
  )
}
