import Container from '@/components/common/container'
import InfoCard from '@/components/common/info-card'
import Section from '@/components/common/section'
import Typography from '@/components/ui/typography'
import ListSectorsMain from '@/features/sectors/components/list-sectors-main'
import HeroSection from '@/features/sectors/components/sections/hero-section'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { getDictionary } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale('/sectors', lang)

  return seoData
}

export default async function Page({ params: { lang } }: ParamsWithLang) {
  const {
    sectorPage,
    blog: { page },
  } = await getDictionary(lang)

  return (
    <div>
      <HeroSection />
      <Container>
        <Section>
          <Typography
            as="h2"
            className="font-normal leading-10 border-b border-dashed border-gray-300 py-5 text-center text-2xl"
          >
            {sectorPage.title}
          </Typography>
        </Section>
        <Section>
          <ListSectorsMain lang={lang} />
        </Section>
        <InfoCard className="lg:hidden" data={page.rightCard} />
      </Container>
    </div>
  )
}
