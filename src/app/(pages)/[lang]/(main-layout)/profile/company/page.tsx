import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import ProfileCompanyPage from '@/features/user/pages/company-page'
import { ParamsWithLang } from '@/i18n/types'
import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale('/profile/company', lang)

  return seoData
}

export default function Page({ params: { lang } }: ParamsWithLang) {
  return <ProfileCompanyPage lang={lang} />
}
