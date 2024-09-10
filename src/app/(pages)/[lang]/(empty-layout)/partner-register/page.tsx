import B2BApplicationPage from '@/features/b2b/pages/b2b-application-page'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { ParamsWithLang } from '@/i18n/types'
import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale('/partner-register', lang)

  return seoData
}

export default async function Page({ params: { lang } }: ParamsWithLang) {
  return <B2BApplicationPage lang={lang} />
}
