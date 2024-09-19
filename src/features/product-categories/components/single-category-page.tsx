import { headers } from 'next/headers'
import Container from '@/components/common/container'
import Section from '@/components/common/section'
import { Locale } from '@/i18n/types'
import React from 'react'
import Typography from '@/components/ui/typography'
import MdxRenderer from '@/components/common/mdx-renderer'
import ListProductCards from '@/features/product/components/list-product-cards'
import { getDictionary } from '@/i18n/get-dictionary'
import { getAllCategories } from '../data/get-all-categories'
import Link from '@/components/ui/link'
import { cn } from '@/lib/utils'
import { sdk } from '@/restoreplus-sdk'
import { ServerImage } from '@/components/ui/image'
import { ListersHeroSection } from '@/components/common/listers-hero-section'
import DocumentContentSection from '@/components/common/document-content-section'

type PageProps = {
  lang: Locale
  slug: string
}

export default async function SingleCategoryPage({ slug, lang }: PageProps) {
  const heads = headers()
  const category = await sdk.productCategories.getSingleByQuery(
    {
      where: {
        translations: {
          some: {
            slug,
          },
        },
      },
    },
    { lang }
  )

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
