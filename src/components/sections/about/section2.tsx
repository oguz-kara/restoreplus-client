import Container from '@/components/common/container'
import ImageContentPanel from '@/components/common/image-content-panel'
import Section from '@/components/common/section'
import { getDictionaryV2 } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import React from 'react'

export default async function Section2({ lang }: PropsWithLang) {
  const dict = await getDictionaryV2(lang)

  const data = {
    title: dict.about.section_two_title,
    description: dict.about.section_two_description,
    listTitle: dict.about.section_two_allows_title,
    list: [
      {
        text: dict.about.section_two_allows_first,
      },
      {
        text: dict.about.section_two_allows_second,
      },
      {
        text: dict.about.section_two_allows_third,
      },
      {
        text: dict.about.section_two_allows_fourth,
      },
      {
        text: dict.about.section_two_allows_fourth,
      },
    ],
    buttonText: dict.about.learn_more_about_us_button_text,
  }

  return (
    <Section>
      <Container>
        <ImageContentPanel
          className="lg:flex-row-reverse"
          data={data}
          lang={lang}
        />
      </Container>
    </Section>
  )
}
