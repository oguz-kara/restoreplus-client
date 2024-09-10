import LoginPageV2 from '@/features/auth/pages/login-page-v2'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { ParamsWithLang } from '@/i18n/types'
import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale('/login', lang)

  return seoData
}

export default function page({ params: { lang } }: ParamsWithLang) {
  return <LoginPageV2 lang={lang} />
}
