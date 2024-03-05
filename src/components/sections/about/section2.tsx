import Container from '@/components/common/container'
import ImageContentPanel from '@/components/common/image-content-panel'
import Section from '@/components/common/section'
import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import React from 'react'

export default async function Section2({ lang }: PropsWithLang) {
  const {
    aboutPage: { section2 },
  } = await getDictionary(lang)

  return (
    <Section>
      <Container>
        <ImageContentPanel
          className="lg:flex-row-reverse"
          data={section2}
          lang={lang}
        />
      </Container>
    </Section>
  )
}
