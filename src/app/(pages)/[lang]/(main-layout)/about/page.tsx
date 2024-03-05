import BlogCardList from '@/components/common/blog-card-list'
import Container from '@/components/common/container'
import DarkGradientPanel from '@/components/common/dark-gradient-panel'
import Section from '@/components/common/section'
import HeroSection from '@/components/sections/about/hero-section'
import Section1 from '@/components/sections/about/section1'
import Section2 from '@/components/sections/about/section2'
import Section3 from '@/components/sections/about/section3'
import { getBlogPostData } from '@/features/blog/data/get-blog-post-data'
import { getDictionary } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'

export default async function Page({ params: { lang } }: ParamsWithLang) {
  const {
    index: { section6 },
  } = await getDictionary(lang)
  const { data } = await getBlogPostData()

  return (
    <div>
      <HeroSection lang={lang} />
      <Section1 lang={lang} />
      <Section2 lang={lang} />
      <Section3 lang={lang} />
      <div className="bg-secondary">
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
