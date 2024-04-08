import { PropsWithLang } from '@/i18n/types'
import ListProductsMain from '../components/list-products-main'
import HeroSection from '@/features/sectors/components/sections/hero-section'
import Container from '@/components/common/container'
import Section from '@/components/common/section'
import Typography from '@/components/ui/typography'
import { getDictionary } from '@/i18n/get-dictionary'
import SearchHeroSection from '@/components/common/search-hero'

interface ListProductsPageProps extends Pagination {
  q?: string
  type: string
}

export default async function ListProductsPage({
  lang,
  q,
  page,
  take,
  type,
}: PropsWithLang & ListProductsPageProps) {
  const {
    product: { listProductPage },
  } = await getDictionary(lang)
  return (
    <div>
      <div>
        <SearchHeroSection />
      </div>
      <Container>
        <Section>
          <div className="flex">
            <div className="flex-1">
              <Typography>Filters</Typography>
            </div>
            <div className="flex-[3]">
              <ListProductsMain lang={lang} q={q} page={page} take={take} type={type} />
            </div>
          </div>
        </Section>
      </Container>
    </div>
  )
}
