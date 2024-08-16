import React from 'react'
import Logo from '@/components/common/logo'
import Image from '@/components/ui/image'
import { PropsWithLang } from '@/i18n/types'
import B2BApplicationForm from '../components/b2b-application-form'

export default function B2BApplicationPage({ lang }: PropsWithLang) {
  return (
    <div className="flex bg-[#121621] min-h-screen">
      <div className="flex-1 bg-white p-5 lg:p-10 m-5 rounded-2xl">
        <div className="flex flex-col justify-center max-w-[600px] mx-auto lg:h-[calc(100vh-120px)]">
          <div className="max-w-[120px] mx-auto mb-10">
            <Logo color="black" width={120} height={120} />
          </div>
          <B2BApplicationForm lang={lang} />
        </div>
      </div>
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center">
        <div className="m-5 rounded-2xl">
          <Image
            className="object-contain max-w-[550px] rounded-2xl"
            src="/images/high-quality-restoreplus.png"
            width={1000}
            height={1000}
            alt="login image"
          />
        </div>
      </div>
    </div>
  )
}
