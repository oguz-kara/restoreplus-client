import BlogCardList from '@/components/common/blog-card-list'
import Container from '@/components/common/container'
import DarkGradientPanel from '@/components/common/dark-gradient-panel'
import Section from '@/components/common/section'
import HeroSection from '@/components/sections/about/hero-section'
import Section1 from '@/components/sections/about/section1'
import Section2 from '@/components/sections/about/section2'
import Section3 from '@/components/sections/about/section3'
import { getStaticBlogPosts } from '@/components/sections/index/section5'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { getDictionary } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale('/about', lang)

  return seoData
}

export default async function Page({ params: { lang } }: ParamsWithLang) {
  const {
    index: { section6 },
  } = await getDictionary(lang)
  const data = await getStaticBlogPosts({ lang })

  return (
    <div>
      <HeroSection lang={lang} />
      <Section1 lang={lang} />
      <Section2 lang={lang} />
      <Section3 lang={lang} />
      <div className="bg-[#1f1f28]">
        <Section>
          <Container>
            <BlogCardList blogPostList={data} lang={lang} />
          </Container>
        </Section>
      </div>
      <DarkGradientPanel theme="gradient" dictionary={section6} />
    </div>
  )
}
