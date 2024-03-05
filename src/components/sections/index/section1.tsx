import Section from '@/components/common/section'
import { Button } from '@/components/ui/button'
import Image from '@/components/ui/image'
import Typography from '@/components/ui/typography'
import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import React from 'react'

export default async function Section1({ lang }: PropsWithLang) {
  const {
    index: { section1 },
  } = await getDictionary(lang)
  return (
    <Section>
      <div className="grid lg:grid-cols-3 gap-5 text-center">
        {section1.columns.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-black p-2 mb-3">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={500}
                height={500}
              />
            </div>
            <Typography as="h4" className="mb-3">
              {item.title}
            </Typography>
            <Typography as="p" className="mb-3">
              {item.desc}
            </Typography>
            <div>
              <Button>{item.buttonText}</Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
