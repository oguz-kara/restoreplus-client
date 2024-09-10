import Container from '@/components/common/container'
import SecondaryMessage from '@/components/common/secondary-message'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { getDictionary } from '@/i18n/get-dictionary'
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
  searchParams: { email },
  params: { lang },
}: {
  searchParams: { email: string }
} & ParamsWithLang) {
  const {
    common: { goTo, loginPageText },
    emailVerificationSuccessfullPage: { titleText, descriptionText },
  } = await getDictionary(lang)

  return (
    <Container className="my-10 text-center">
      <SecondaryMessage
        title={`👏${titleText}`}
        description={descriptionText}
        footerComp={
          <Typography className="capitalize my-2">
            {goTo}
            {` `}
            <Link
              className="text-blue-500 font-semibold"
              lang={lang}
              href="/login"
            >
              {loginPageText}
            </Link>
          </Typography>
        }
      />
    </Container>
  )
}
