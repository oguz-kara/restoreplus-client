import Container from '@/components/common/container'
import BecomePartnerSection from '@/components/pages/index/become-partner-section'
import CategoriesSection from '@/components/pages/index/categories-section'
import HeroSection from '@/components/pages/index/hero-section'
import ProductSeriesSection from '@/components/pages/index/product-series-section'
import RecommendedForYouSection from '@/components/pages/index/recommended-for-you-section'
import WhereToUseSection from '@/components/pages/index/where-to-use-section'
import { ParamsWithLang } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'

export default async function page({ params: { lang } }: ParamsWithLang) {
  const { data: applicationScopes } = await sdk.applicationScopes.getAllByQuery(
    { take: '8' },
    { lang }
  )

  const { data: productCategories } = await sdk.productCategories.getAllByQuery(
    { take: '8' },
    { lang }
  )

  const { data: productSeries } = await sdk.productSeries.getAllByQuery(
    { take: 'all' },
    { lang }
  )

  const foodGradeProductCategory = await sdk.productCategories.getById(
    process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 24 : 44,
    { lang, isAdmin: true }
  )

  console.log({ foodGradeProductCategory })

  const foodGradeCategorySlug =
    foodGradeProductCategory && !foodGradeProductCategory.message
      ? foodGradeProductCategory?.translation.slug
      : undefined

  return (
    <div>
      <HeroSection lang={lang} categorySlug={foodGradeCategorySlug} />
      <Container>
        <ProductSeriesSection productSeries={productSeries} lang={lang} />
        <WhereToUseSection lang={lang} applicationScopes={applicationScopes} />
        <RecommendedForYouSection lang={lang} />
        <CategoriesSection lang={lang} productCategories={productCategories} />
      </Container>
      <BecomePartnerSection lang={lang} />
    </div>
  )
}
