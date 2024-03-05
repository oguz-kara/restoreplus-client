import Container from '@/components/common/container'
import InfoCard from '@/components/common/info-card'
import Section from '@/components/common/section'
import Typography from '@/components/ui/typography'
import ListSectorsMain from '@/features/sectors/components/list-sectors-main'
import HeroSection from '@/features/sectors/components/sections/hero-section'
import { getDictionary } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'

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
