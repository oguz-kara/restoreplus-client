import ProfileCompanyPage from '@/features/user/pages/company-page'
import { ParamsWithLang } from '@/i18n/types'
import React from 'react'

export default function Page({ params: { lang } }: ParamsWithLang) {
  return <ProfileCompanyPage lang={lang} />
}
