import Container from '@/components/common/container'
import Section from '@/components/common/section'
import SectionHeader from '@/components/common/section-header'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import React from 'react'

export default async function Section6({
  lang,
  theme = 'normal',
}: PropsWithLang & { theme?: 'normal' | 'gradient' }) {
  const {
    index: { section6 },
  } = await getDictionary(lang)

  const classNames =
    theme === 'normal'
      ? 'bg-white text-black'
      : 'bg-gradient-to-r from-[#1e1e27] to-[#313140] text-white'

  return (
    <div className={classNames}>
      <Container>
        <Section>
          <div className="lg:flex lg:items-center lg:gap-20">
            <div>
              <SectionHeader className="mb-5">{section6.heading}</SectionHeader>
              <Typography as="p" className="mb-5">
                <span className="font-bold">{section6.aboutBold}</span>
                <span>{section6.about}</span>
              </Typography>
            </div>
            <div className="flex justify-center">
              <Button className="p-7 text-lg">{section6.aboutButton}</Button>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  )
}
