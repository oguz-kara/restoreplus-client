import Image from '@/components/ui/image'
import serverConfig from '@/config/server-config.json'
import Typography from '@/components/ui/typography'
import Link from '@/components/ui/link'
import { PropsWithLang } from '@/i18n/types'
import { getDictionary } from '@/i18n/get-dictionary'
import { ArrowRight } from 'lucide-react'

export default async function MainBlogCard({
  data,
  lang,
}: {
  data: BlogPost
} & PropsWithLang) {
  const {
    blog: { buttonText },
  } = await getDictionary(lang)
  return (
    <Link href={`/blog/${data.id}/${data.translation.slug}`} lang={lang}>
      <div className="flex flex-col-reverse gap-5 lg:flex-row lg:justify-between lg:gap-10  py-10 border-b border-dashed border-gray-200">
        <div className="flex-[2]">
          <Typography as="h3" className="mb-5">
            {data.translation.title}
          </Typography>
          <Typography as="p">{data.translation.description}</Typography>
          <div className="inline-flex bg-foreground text-white p-3 rounded-md hover:bg-primary hover:text-foreground transition-all my-5">
            <span className="mr-3">{buttonText}</span>
            <ArrowRight />
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
