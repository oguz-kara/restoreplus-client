import Container from '@/components/common/container'
import BecomePartnerSection from '@/components/pages/index/become-partner-section'
import HeroSection from '@/components/pages/index/hero-section'
import ProductSeriesSection from '@/components/pages/index/product-series-section'
import RecommendedForYouSection from '@/components/pages/index/recommended-for-you-section'
import WhereToUseSection from '@/components/pages/index/where-to-use-section'
import { ParamsWithLang } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'

export default async function page({ params: { lang } }: ParamsWithLang) {
  const { data: productCategories } = await sdk.productCategories.getAllByQuery(
    { take: '8' },
    { lang }
  )

  const { data: productSeries } = await sdk.productSeries.getAllByQuery(
    { take: 'all' },
    { lang }
  )

  return (
    <div>
      <HeroSection lang={lang} />
      <Container>
        <ProductSeriesSection productSeries={productSeries} lang={lang} />
        <WhereToUseSection lang={lang} applicationScopes={productCategories} />
        <RecommendedForYouSection lang={lang} />
      </Container>
      <BecomePartnerSection lang={lang} />
    </div>
  )
}
