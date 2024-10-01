import Breadcumbs from '@/components/common/breadcumbs'
import Container from '@/components/common/container'
import MainBanner from '@/components/common/main-banner'
import SearchInput from '@/components/common/search-input'
import { Alert } from '@/components/ui/alert'
import Typography from '@/components/ui/typography'
import CollectionCard from '@/features/collections/components/collection-card'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { getDictionary } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'
import { AlertCircle } from 'lucide-react'
import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale(
    '/collections/product-categories',
    lang
  )

  return seoData
}

export default async function Page({
  params: { lang },
  searchParams: { q },
}: ParamsWithLang & SearchParamsWithTerm) {
  const dict = await getDictionary(lang)

  const { data: productCategories } = q
    ? await sdk.productCategories.search(q, { lang })
    : await sdk.productCategories.getAllByQuery({ take: 'all' }, { lang })

  const breadcumbsData = [
    {
      title: dict.common.home_text,
      href: '/',
    },
    {
      title: dict.collections.collections_text,
      href: '/collections',
    },
    {
      title: dict.collections.product_categories_collection_title,
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
            {dict.collections.product_categories_collection_title}
          </Typography>
        </div>
      </Container>
      <MainBanner
        backgroundUrl="url(/images/categories-banner.jpg) no-repeat center center/cover"
        decorationImageUrl="/images/index-slides/slider-decoration-foreground.png"
        lang={lang}
        productImageUrl="/images/index-slides/slide-4-product-image.png"
      >
        {dict.collections.product_categories_hero_1} <br />{' '}
        <span className="text-white">
          {dict.collections.product_categories_hero_2}
        </span>
      </MainBanner>
      <Container>
        <div className="px-2 pt-5">
          <Typography
            as="h2"
            className="uppercase text-5xl font-semibold text-foreground"
          >
            {`${dict.collections.product_categories_collection_title} ${dict.common.list_text}`}
          </Typography>
          <SearchInput
            className="mb-0"
            placeholder={dict.collections.product_categories_search_placeholder}
          />
        </div>
        {!productCategories || productCategories.length === 0 ? (
          <div className="px-2 py-5">
            <Alert className="flex items-center gap-2" variant="default">
              <div>
                <AlertCircle />
              </div>
              <div>{dict.common.no_data_found_text}</div>
            </Alert>
          </div>
        ) : (
          <div className="product-series grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-5 flex-col md:flex-row flex-wrap px-2 py-5">
            {(productCategories as ProductCategory[]).map((item) => (
              <CollectionCard
                key={item.id}
                imagePath={item.featuredImage?.path || '/'}
                title={item.translation.name}
                href={`/collections/product-categories/${item.translation.slug}`}
                lang={lang}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
