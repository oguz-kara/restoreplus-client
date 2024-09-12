import DarkGradientPanel from '@/components/common/dark-gradient-panel'
import HeroSection from '@/components/sections/about/hero-section'
import Section1 from '@/components/sections/about/section1'
import Section2 from '@/components/sections/about/section2'
import Section3 from '@/components/sections/about/section3'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { ParamsWithLang } from '@/i18n/types'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale('/about', lang)

  return seoData
}

export default async function Page({ params: { lang } }: ParamsWithLang) {
  return (
    <div>
      <HeroSection lang={lang} />
      <Section1 lang={lang} />
      <Section2 lang={lang} />
      <Section3 lang={lang} />
      <DarkGradientPanel theme="gradient" lang={lang} />
    </div>
  )
}
