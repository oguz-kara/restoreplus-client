import Container from '@/components/common/container'
import ProductCategoriesSide from '@/features/product-categories/components/product-categories-side'
import { categoryTreeQuery } from '@/features/product-categories/queries/category-tree-query'
import { ParamsWithLang } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'
import React, { PropsWithChildren } from 'react'

export default async function ProductDetailLayout({
  children,
  params: { lang, id },
}: PropsWithChildren & ParamsWithLang & ParamsWithId) {
  const { data: categoryData } = await sdk.productCategories.getAllByQuery(
    categoryTreeQuery,
    {
      lang,
    }
  )
  const product = await sdk.products.getById(Number(id), { lang })
  let categoryIds: number[] = []

  if (product)
    product.categories?.map((category: any) => categoryIds.push(category.id))

  return (
    <Container className="p-5 ">
      <div className="flex gap-5">
        <div className="hidden lg:block  flex-1 ">
          <ProductCategoriesSide categories={categoryData} product={product} />
        </div>
        <div className="flex-[3]">{children}</div>
      </div>
    </Container>
  )
}
