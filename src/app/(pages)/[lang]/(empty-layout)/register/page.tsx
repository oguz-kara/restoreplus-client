import Logo from '@/components/common/logo'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import RegisterForm from '@/features/auth/components/register-form'
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

  return (
    <div className="bg-foreground flex justify-center h-screen">
      <div className=" lg:max-w-[400px] p-5">
        <div className="flex justify-center mb-10">
          <Link lang={lang} href="/">
            <Logo width={150} height={150} />
          </Link>
        </div>
        <div className="flex items-center justify-center flex-col text-white mb-5">
          <Typography className="mb-5 text-center" as="h4">
            {page.title}
          </Typography>
          <Typography className="text-center" as="p">
            {page.text}
          </Typography>
        </div>
        <RegisterForm lang={lang} />
        <div>
          <Typography as="p" className="text-sm text-gray-300">
            <span className="mr-2">{page.signUp.text}</span>
            <span className="text-blue-400">
              <Link href={page.signUp.href} lang={lang}>
                {page.signUp.linkText}
              </Link>
            </span>
          </Typography>
        </div>
      </div>
    </div>
  )
}
