import Container from '@/components/common/container'
import { Locale } from '@/i18n/types'
import React from 'react'
import { getDictionary } from '@/i18n/get-dictionary'
import { sdk } from '@/restoreplus-sdk'
import { ListersHeroSection } from '@/components/common/listers-hero-section'
import DocumentContentSection from '@/components/common/document-content-section'
import { getProperLanguage } from '@/i18n/utils'
import { notFound } from 'next/navigation'

type PageProps = {
  lang: Locale
  slug: string
}

export default async function SingleCategoryPage({ slug, lang }: PageProps) {
  const properLang = getProperLanguage(lang)
  const category = await sdk.productCategories.getSingleByQuery(
    {
      where: {
        translations: {
          some: {
            slug,
            locale: {
              locale: properLang,
            },
          },
        },
      },
    },
    { lang }
  )

  if (!category || category.message) return notFound()

  const { data: products } = await sdk.products.getAllByQuery(
    {
      where: {
        categories: {
          some: {
            id: category?.id,
          },
        },
      },
    },
    { lang }
  )
  const { data: otherCategories } = await sdk.productCategories.getAllByQuery(
    {},
    { lang }
  )

  const dict = await getDictionary(lang)
  const content = {
    sidebarTitle: dict.product.product_category_other_categories_text,
    discoverProductsText:
      dict.product.product_category_discover_restoreplus_products_for_text,
  }

  return (
    <div>
      <ListersHeroSection data={category} />
      <Container>
        <DocumentContentSection
          content={content}
          lang={lang}
          listOfOtherContent={otherCategories || []}
          mainContent={category}
          products={products || []}
        />
      </Container>
    </div>
  )
}
