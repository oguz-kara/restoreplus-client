import Container from '@/components/common/container'
import ProductCategoriesSide from '@/features/product-categories/components/product-categories-side'
import { getProductById } from '@/features/product/data/get-product-by-id'
import { getProductCategoryData } from '@/features/product/data/get-product-category-data'
import { ParamsWithLang } from '@/i18n/types'
import React, { PropsWithChildren } from 'react'

export default async function ProductDetailLayout({
  children,
  params: { lang, id },
}: PropsWithChildren & ParamsWithLang & ParamsWithId) {
  
  const { data } = await getProductCategoryData({ lang })
  const product = await getProductById(id, lang)
  let categoryIds: number[] = []

  if (product)
    product.categories.map((category: any) => categoryIds.push(category.id))

  const hasCategoryId = (id: number) => {
    return categoryIds.includes(id)
  }

  const productInSubCategory = (category: any) => {
    const subCategoryIDs = category.subCategories.map(
      (subCategory: any) => subCategory.id
    )

    const isInSubCategory = subCategoryIDs.find((subCategoryId: number) =>
      categoryIds.includes(subCategoryId)
    )

    return isInSubCategory ? true : hasCategoryId(category.id)
  }

  return (
    <Container className="p-5">
      <div className="flex gap-20">
        <div className="flex-1">
          <ProductCategoriesSide categories={data} product={product} />
        </div>
        <div className="flex-[3]">{children}</div>
      </div>
    </Container>
  )
}
