import HeroSection from '@/components/sections/index/hero-section'
import { ParamsWithLang } from '@/i18n/types'
import Container from '@/components/common/container'
import Section2 from '@/components/sections/index/section2'
import Section3 from '@/components/sections/index/section3'
import Section5 from '@/components/sections/index/section5'
import Section6 from '@/components/sections/index/section6'
import Section7 from '@/components/sections/index/section7'
import { getCategoriesWithSubCategories } from '@/features/categories/data/get-categories-with-sub-categories'
import Section1 from '@/components/sections/index/section1'
import Section4 from '@/components/sections/index/section4'

export default async function Home({ params: { lang } }: ParamsWithLang) {
  const categoryData = await getCategoriesWithSubCategories()

  return (
    <div>
      <HeroSection />
      <div className="shadow-[0_0_0.3rem_0_rgba(0,0,0,0.1)]">
        <Container>
          <Section1 lang={lang} />
        </Container>
      </div>
      <div className="bg-foreground">
        <Container>
          <Section2 lang={lang} />
          <Section3 lang={lang} />
        </Container>
      </div>
      <div className="shadow-[0_0_0.3rem_0_rgba(0,0,0,0.1)]">
        <Section4 lang={lang} />
      </div>
      <div className="shadow-[0_0_0.3rem_0_rgba(0,0,0,0.1)]">
        <Section5 lang={lang} />
      </div>
      <div className="shadow-[0_0_0.3rem_0_rgba(0,0,0,0.1)]">
        <Section6 lang={lang} />
      </div>
      <div className="shadow-[0_0_0.3rem_0_rgba(0,0,0,0.1)]">
        <Section7 lang={lang} categoryData={categoryData} />
      </div>
      <div className="shadow-[0_0_0.3rem_0_rgba(0,0,0,0.1)]">
        <Section6 theme="gradient" lang={lang} />
      </div>
    </div>
  )
}
