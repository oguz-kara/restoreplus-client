import { PropsWithLang } from '@/i18n/types'
import { getSingleBlogPostById } from '../data/get-single-blog-post'
import Typography from '@/components/ui/typography'
import Container from '@/components/common/container'
import Section from '@/components/common/section'
import Link from '@/components/ui/link'
import { Button } from '@/components/ui/button'
import { getDictionary } from '@/i18n/get-dictionary'
import { Facebook, ThumbsDown, ThumbsUp, Twitter, X } from 'lucide-react'
import MdxRenderer from '@/components/common/mdx-renderer'
import InfoCard from '@/components/common/info-card'
import { ServerImage } from '@/components/ui/image'

interface SingleBlogPageProps extends PropsWithLang {
  id: string
}

const options: Intl.DateTimeFormatOptions = {
  dateStyle: 'long',
}

export default async function SingleBlogPage({
  lang,
  id,
}: SingleBlogPageProps) {
  const {
    blog: {
      singlePage,
      page: { rightCard },
    },
  } = await getDictionary(lang)
  const data = await getSingleBlogPostById(id)
  let formattedDate

  if (data?.createdAt) {
    const date = new Date()
    formattedDate = date.toLocaleDateString(lang, options)
  }

  return (
    <Container className="flex flex-col md:flex-row">
      <Section className="lg:flex-[3]">
        <div className="pb-5 border-b border-dashed border-gray-200">
          <div className="pb-5 pt-10">
            <Typography as="h1">{data?.translation.title}</Typography>
          </div>
          <div className="pb-5 lg:max-w-[60%]">
            <ServerImage
              className="object-contain aspect-video"
              src={data?.featuredImage?.path || ''}
              width={500}
              height={500}
              alt={data?.featuredImage?.alt || ''}
            />
          </div>
          <div className="mb-2">
            <Link href="/" lang={lang} className="text-sm">
              <span className="text-blue-800 underline pr-1 border-r border-gray-400 capitalize">
                {data?.authorName}
              </span>
              <span className="px-1 text-gray-400 ">{formattedDate}</span>
            </Link>
          </div>
          <SocialPostButtons lang={lang} />
        </div>
        <div className="py-5">
          <MdxRenderer
            mdxText={data?.translation.content}
            className="!bg-white !text-black"
          />
        </div>
        <div>
          <Typography as="p" className="mb-3">
            {singlePage.useful}
          </Typography>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1">
              {singlePage.yes}
              <ThumbsUp size="15px" />
            </Button>
            <Button variant="outline" className="gap-1">
              {singlePage.no}
              <ThumbsDown size="15px" />
            </Button>
          </div>
        </div>
      </Section>
      <Section className="lg:flex-[1]">
        <div className="pb-5 pt-10">
          <InfoCard data={rightCard} />
        </div>
      </Section>
    </Container>
  )
}

async function SocialPostButtons({ lang }: PropsWithLang) {
  const {
    socialPostData: { platforms },
  } = await getDictionary(lang)

  return (
    <div className="flex gap-2">
      <div>
        <Button className="bg-foreground text-white w-24 capitalize">
          <Twitter className="pr-1" />
          {platforms.twitter.text}
        </Button>
      </div>
      <div>
        <Button className="bg-[#4267B2] text-white w-24 capitalize">
          <Facebook className="pr-1" />
          {platforms.facebook.text}
        </Button>
      </div>
    </div>
  )
}
