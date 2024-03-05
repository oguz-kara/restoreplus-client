import React from 'react'
import Typography from '../ui/typography'
import { Button } from '../ui/button'
import Image from '../ui/image'
import Link from '../ui/link'
import { Locale } from '@/i18n/types'
import { CheckCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageContentPanelInputDataType {
  title: string
  description: string
  listTitle: string
  list: { text: string; href?: string }[]
  buttonText: string
  image: {
    src: string
    alt: string
  }
}

export default async function ImageContentPanel({
  data,
  lang,
  className,
}: {
  data: ImageContentPanelInputDataType
  lang: Locale
} & PropsWithClassName) {
  return (
    <div className="mt-10 lg:mt-20">
      <div
        className={cn('flex flex-col-reverse lg:flex-row gap-10', className)}
      >
        <div className="lg:flex-1">
          <Typography as="h4" className="mb-5 text-4xl">
            {data.title}
          </Typography>
          <Typography as="p" className="leading-7 mb-5 text-lg">
            {data.description}
          </Typography>
          <Typography as="h5" className="leading-10 mb-5 font-semibold">
            {data.listTitle}
          </Typography>
          <ul className="mb-10">
            {data.list.map((item, i) => (
              <li key={i} className="mb-4 flex items-center gap-3">
                <span>
                  <CheckCheck className="text-[#6DB042]" />
                </span>
                {item.href ? (
                  <span className="underline text-blue-500">
                    <Link lang={lang} href={item.href}>
                      {item.text}
                    </Link>
                  </span>
                ) : (
                  <span>{item.text}</span>
                )}
              </li>
            ))}
          </ul>
          <Button className="text-lg">{data.buttonText}</Button>
        </div>
        <div className="lg:flex-1">
          <Image
            className="w-full"
            src={data.image.src}
            alt={data.image.alt}
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  )
}
