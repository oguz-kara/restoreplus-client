import Image from '@/components/ui/image'
import serverConfig from '@/config/server-config.json'
import Typography from '@/components/ui/typography'
import Link from '@/components/ui/link'
import { PropsWithLang } from '@/i18n/types'
import { Button } from '@/components/ui/button'
import { getDictionary } from '@/i18n/get-dictionary'
import { ArrowRight } from 'lucide-react'

export default async function MainBlogCard({
  data,
  lang,
}: {
  data: BlogPostWithOneTranslation
} & PropsWithLang) {
  const {
    blog: { buttonText },
  } = await getDictionary(lang)
  return (
    <Link href={`/blog/${data.id}/${data.translation.slug}`} lang={lang}>
      <div className="flex flex-col-reverse gap-5 lg:flex-row lg:justify-between lg:gap-10  py-10 border-b border-dashed border-gray-200">
        <div className="flex-[2]">
          <Typography as="h3" className="mb-5 hover:text-primary">
            {data.translation.title}
          </Typography>
          <Typography as="p">{data.translation.excerpt}</Typography>
          <div>
            <Link
              lang={lang}
              href={`/blog/${data.id}/${data.translation.slug}`}
            >
              <Button className="bg-foreground text-white mt-5 hover:bg-primary hover:text-black">
                <span className="mr-3">{buttonText}</span>
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-[1]">
          <Image
            className="!w-full !h-auto md:w-[200px] md:h[150px] object-cover"
            src={`${serverConfig.remoteUrl}/${data.featuredImage?.path}`}
            width={200}
            height={200}
            alt={data.featuredImage?.alt ? data.featuredImage.alt : 'image'}
          />
        </div>
      </div>
    </Link>
  )
}
