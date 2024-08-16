import RegisterPage from '@/features/auth/pages/register-page'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { getDictionary } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'
import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale('/register', lang)

  return seoData
}

export default async function Page({ params: { lang } }: ParamsWithLang) {
  const {
    auth: {
      register: { page },
    },
  } = await getDictionary(lang)

  return <RegisterPage lang={lang} />
}
