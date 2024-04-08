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
      <div className="grid lg:grid-cols-3 gap-5 text-center h-full">
        {section1.columns.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center flex-col">
              <div className="p-2 mb-3">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={150}
                  height={150}
                  style={{
                    width: '80px',
                  }}
                />
              </div>
              <Typography as="h4" className="mb-3 text-md">
                {item.title}
              </Typography>
              <Typography as="p" className="mb-3 text-gray-400 text-sm">
                {item.desc}
              </Typography>
            </div>
            <div>
              <Button>{item.buttonText}</Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
