import LoginPageV2 from '@/features/auth/pages/login-page-v2'
import { ParamsWithLang } from '@/i18n/types'
import React from 'react'

export default function page({ params: { lang } }: ParamsWithLang) {
  return <LoginPageV2 lang={lang} />
}
