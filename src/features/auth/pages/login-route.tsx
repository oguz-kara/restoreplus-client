import React from 'react'
import Image from '@/components/ui/image'
import LoginForm from '../components/login-form-v2'
import RestoreplusLogo from '@/components/common/logo'

export default function LoginRoute({ lang }: { lang: any }) {
  return (
    <div className="flex">
      <div className="flex-1 bg-white lg:p-10 m-5 rounded-2xl">
        <div className="flex flex-col justify-center max-w-[400px] mx-auto h-[calc(100vh-120px)]">
          <div className="max-w-[120px] mx-auto">
            <RestoreplusLogo color="black" width={120} height={120} />
          </div>
          <LoginForm lang={lang} />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
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
