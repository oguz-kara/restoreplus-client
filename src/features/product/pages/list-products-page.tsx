import { PropsWithLang } from '@/i18n/types'
import ListProductsMain from '../components/list-products-main'
import HeroSection from '@/features/sectors/components/sections/hero-section'
import Container from '@/components/common/container'
import Section from '@/components/common/section'
import Typography from '@/components/ui/typography'
import { getDictionary } from '@/i18n/get-dictionary'

export default async function ListProductsPage({ lang }: PropsWithLang) {
  const {
    product: { listProductPage },
  } = await getDictionary(lang)
  return (
    <div>
      <HeroSection />
      <Container>
        <Section>
          <Typography as="h2" className="py-10 text-center font-normal text-4xl uppercase">
            {listProductPage.title}
          </Typography>
          <ListProductsMain lang={lang} />
        </Section>
      </Container>
    </div>
  )
}
