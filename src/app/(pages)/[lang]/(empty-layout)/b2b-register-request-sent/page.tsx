import Container from '@/components/common/container'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { getDictionary } from '@/i18n/get-dictionary'
import { Locale } from '@/i18n/types'
import { getProperLanguage } from '@/i18n/utils'
import { CheckCircle } from 'lucide-react'
import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale(
    '/b2b-register-request-sent',
    lang
  )

  return seoData
}

export default async function Page({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const properLang = getProperLanguage(lang as Locale)
  const dict = await getDictionary(lang as Locale)

  return (
    <Container className="min-h-screen">
      <div>
        <div className="flex flex-col justify-center items-center gap-5 p-20 rounded-lg">
          <CheckCircle size="92px" color="green" />
          <Typography className="font-semibold" as="h1">
            {dict.b2b_register_request_sent.title}
          </Typography>
          <Typography as="p">
            {dict.b2b_register_request_sent.description}
          </Typography>
          <Typography as="p">
            <span className="mr-1">{dict.common.go_to_text}</span>
            <Link
              className="text-blue-500 font-semibold capitalize"
              href="/"
              lang={properLang as Locale}
            >
              {dict.common.homepage_text}
            </Link>
          </Typography>
        </div>
      </div>
    </Container>
  )
}
