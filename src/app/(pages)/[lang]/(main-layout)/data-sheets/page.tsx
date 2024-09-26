import Breadcumbs from '@/components/common/breadcumbs'
import Container from '@/components/common/container'
import { getDictionary } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'

export default async function Page({ params: { lang } }: ParamsWithLang) {
  const dict = await getDictionary(lang)

  const breadcumbsData = [
    {
      title: dict.common.home_text,
      href: '/',
    },
    {
      title: dict.common.data_sheets_text,
      href: '/data-sheets',
    },
  ]

  return (
    <div>
      <Container>
        <Breadcumbs data={breadcumbsData} lang={lang} />
      </Container>
    </div>
  )
}
