import Container from '@/components/common/container'
import ImageContentPanel from '@/components/common/image-content-panel'
import Section from '@/components/common/section'
import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import React from 'react'

interface ImageContentPanelInputDataType {
  title: string
  description: string
  listTitle: string
  list: { text: string; href?: string }[]
  buttonText: string
}

export default async function Section1({ lang }: PropsWithLang) {
  const dict = await getDictionary(lang)

  const data = {
    title: dict.about.section_one_title,
    description: dict.about.section_one_description,
    listTitle: dict.about.section_one_including_text,
    list: [
      {
        text: dict.about.section_one_including_first,
        href: '/',
      },
      {
        text: dict.about.section_one_including_second,
        href: '/',
      },
      {
        text: dict.about.section_one_including_third,
        href: '/',
      },
      {
        text: dict.about.section_one_including_fourth,
        href: '/',
      },
      {
        text: dict.about.section_one_including_fifth,
        href: '/',
      },
    ],
    buttonText: dict.about.learn_more_about_us_button_text,
  }

  return (
    <Section>
      <Container>
        <ImageContentPanel data={data} lang={lang} />
      </Container>
    </Section>
  )
}
