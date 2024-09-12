import Container from '@/components/common/container'
import ImageContentPanel from '@/components/common/image-content-panel'
import Section from '@/components/common/section'
import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import React from 'react'

export default async function Section3({ lang }: PropsWithLang) {
  const dict = await getDictionary(lang)

  const data = {
    title: dict.about.section_three_title,
    description: dict.about.section_three_description,
    listTitle: dict.about.section_three_allows_title,
    list: [
      {
        text: dict.about.section_three_allows_first,
      },
      {
        text: dict.about.section_three_allows_second,
      },
      {
        text: dict.about.section_three_allows_third,
      },
    ],
    buttonText:
      dict.about.section_three_register_to_become_reseller_button_text,
  }

  return (
    <Section>
      <Container>
        <ImageContentPanel data={data} lang={lang} />
      </Container>
    </Section>
  )
}
