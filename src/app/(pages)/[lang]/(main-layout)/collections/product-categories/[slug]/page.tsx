import Breadcumbs from '@/components/common/breadcumbs'
import Container from '@/components/common/container'
import SearchInput from '@/components/common/search-input'
import { Alert } from '@/components/ui/alert'
import Typography from '@/components/ui/typography'
import CollectionProductCard from '@/features/collections/components/collection-product-card'
import { searchProductsByCategorySlug } from '@/features/collections/data/search-products-by-category-slug'
import { getDictionary } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'
import { AlertCircle } from 'lucide-react'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function Page({
  params: { lang, slug },
  searchParams: { q },
}: ParamsWithLang & SearchParamsWithTerm & ParamsWithSlug) {
  const dict = await getDictionary(lang)

  const productCategory = await sdk.productCategories.getSingleByQuery(
    {
      where: {
        translations: {
          some: {
            slug,
            locale: {
              locale: lang,
            },
          },
        },
      },
    },
    { lang }
  )

  if (!productCategory || productCategory.message) return notFound()

  const { data: products } = await searchProductsByCategorySlug({
    slug,
    term: q || null,
    lang,
  })

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
      href: '/collections/product-categories',
    },
    {
      title: productCategory.translation.name,
      href: `/product/categories/${slug}`,
    },
    {
      title: dict.common.products_text,
    },
  ]

  return (
    <div className="min-h-screen">
      <Container className="p-2">
        <Breadcumbs lang={lang} data={breadcumbsData} />
      </Container>
      <Container>
        <div className="px-2">
          <div className="pt-5">
            <Typography
              as="h2"
              className="uppercase text-5xl font-semibold text-foreground"
            >
              {`${productCategory.translation.name} ${dict.common.products_text}`}
            </Typography>
          </div>
          <div className="pt-5">
            <SearchInput
              className="mb-0"
              placeholder={dict.collections.search_for_product_text}
            />
          </div>
        </div>
        {!products || products.length === 0 ? (
          <div className="px-2 py-5">
            <Alert className="flex items-center gap-2" variant="default">
              <div>
                <AlertCircle />
              </div>
              <div>{dict.common.no_data_found_text}</div>
            </Alert>
          </div>
        ) : (
          <div className="product-series grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-5 flex-col md:flex-row flex-wrap px-2 py-5">
            {(products as Product[]).map((item) => (
              <CollectionProductCard key={item.id} product={item} lang={lang} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}