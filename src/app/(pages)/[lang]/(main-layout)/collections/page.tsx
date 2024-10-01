import Breadcumbs from '@/components/common/breadcumbs'
import Container from '@/components/common/container'
import MainBanner from '@/components/common/main-banner'
import Typography from '@/components/ui/typography'
import CollectionCard from '@/features/collections/components/collection-card'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { getDictionary } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'
import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale('/collections', lang)

  return seoData
}

export default async function Page({ params: { lang } }: ParamsWithLang) {
  const dict = await getDictionary(lang)

  const { data: productSeries } = await sdk.productSeries.getAllByQuery(
    { take: 'all' },
    { lang }
  )

  const breadcumbsData = [
    {
      title: dict.common.home_text,
      href: '/',
    },
    {
      title: dict.collections.collections_text,
    },
  ]

  return (
    <div>
      <Container>
        <Breadcumbs lang={lang} data={breadcumbsData} />
        <div className="py-5 px-2">
          <Typography
            as="h1"
            className="uppercase text-5xl font-semibold text-foreground"
          >
            {dict.collections.product_series_header_text}
          </Typography>
        </div>
      </Container>
      <MainBanner
        backgroundUrl="url(/images/series-banner.jpg) no-repeat center center/cover"
        decorationImageUrl="/images/index-slides/slider-decoration-foreground.png"
        lang={lang}
        productImageUrl="/images/index-slides/slide-4-product-image.png"
      >
        {dict.collections.product_series_hero_title_1} <br />{' '}
        <span className="text-white">
          {dict.collections.product_series_hero_title_2}
        </span>
      </MainBanner>
      <Container>
        <div className="product-series grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-2 gap-y-5 flex-col md:flex-row flex-wrap p-2 py-10">
          <CollectionCard
            title={dict.common.application_scopes_text}
            href={`/collections/application-scopes`}
            lang={lang}
          />

          <CollectionCard
            title={dict.common.product_categories_text}
            href={`/collections/product-categories`}
            lang={lang}
          />

          <CollectionCard
            title={dict.common.product_series_text}
            href={`/collections/product-series`}
            lang={lang}
          />
        </div>
      </Container>
    </div>
  )
}
