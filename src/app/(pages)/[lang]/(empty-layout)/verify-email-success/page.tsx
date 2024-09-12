import Container from '@/components/common/container'
import SecondaryMessage from '@/components/common/secondary-message'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { getDictionaryV2 } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale(
    '/verify-email-success',
    lang
  )

  return seoData
}

export default async function Page({
  params: { lang },
}: {
  searchParams: { email: string }
} & ParamsWithLang) {
  const dict = await getDictionaryV2(lang)

  return (
    <Container className="my-10 text-center">
      <SecondaryMessage
        title={`👏${dict.verify_email_success.title}`}
        description={dict.verify_email_success.description}
        footerComp={
          <Typography className="capitalize my-2">
            {dict.common.go_to_text}
            {` `}
            <Link
              className="text-blue-500 font-semibold"
              lang={lang}
              href="/login"
            >
              {dict.common.login_page_text}
            </Link>
          </Typography>
        }
      />
    </Container>
  )
}
