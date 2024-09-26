import BecomePartnerSection from '@/components/pages/index/become-partner-section'
import { ParamsWithLang } from '@/i18n/types'
import React, { PropsWithChildren } from 'react'

export default function Layout({
  children,
  params: { lang },
}: PropsWithChildren & ParamsWithLang) {
  return (
    <div className="bg-[#f3f3f3]">
      {children}
      <div className="lg:mt-20 bg-transparent relative">
        <BecomePartnerSection lang={lang} />
      </div>
    </div>
  )
}
