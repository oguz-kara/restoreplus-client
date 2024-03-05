import Container from '@/components/common/container'
import ImageContentPanel from '@/components/common/image-content-panel'
import Section from '@/components/common/section'
import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import React from 'react'

export default async function Section3({ lang }: PropsWithLang) {
  const {
    aboutPage: { section3 },
  } = await getDictionary(lang)

  return (
    <Section>
      <Container>
        <ImageContentPanel data={section3} lang={lang} />
      </Container>
    </Section>
  )
}
