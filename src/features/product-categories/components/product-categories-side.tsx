'use client'
import Typography from '@/components/ui/typography'
import { useDictionary } from '@/context/use-dictionary'
import { cn } from '@/lib/utils'
import { getSearchParam } from '@/utils/get-search-param'
import { ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function ProductCategoriesSide({
  categories,
  product,
}: {
  categories: ProductCategory[]
  product: ProductCategory | null
}) {
  const { lang } = useDictionary()
  const searchParams = useSearchParams()
  const router = useRouter()
  let categoryIds: number[] = []

  if (product)
    product.categories?.map((category: any) => categoryIds.push(category.id))

  const hasCategoryId = (id: number) => {
    return categoryIds.includes(id)
  }

  const productInSubCategory = (category: any) => {
    const subCategoryIDs = category?.subCategories?.map(
      (subCategory: any) => subCategory.id
    )

    const isInSubCategory = subCategoryIDs?.find((subCategoryId: number) =>
      categoryIds.includes(subCategoryId)
    )

    return isInSubCategory ? true : hasCategoryId(category.id)
  }

  const addSearchParam = (name: string, value: string) => {
    const query = getSearchParam({
      name,
      value,
      searchParams,
    })

    const properLang = lang ? lang : ''

    router.push(`/${properLang}/product/finder${query}`)
  }

  return (
    <div className="flex-1">
      <Typography className="border-b border-gray-200 py-3" as="h5">
        Categories
      </Typography>
      <ul>
        {categories?.map((category: any, i: number) => (
          <li key={i} className="border-b border-gray-200 py-3 cursor-pointer">
            <div
              className={cn(
                'flex justify-between items-center hover:text-primary',
                productInSubCategory(category) ? 'border-b border-gray-200' : ''
              )}
              onClick={() =>
                addSearchParam(
                  'categorySlug',
                  `${category?.translation.slug},${category?.translation.id}`
                )
              }
            >
              <Typography
                className={cn(
                  'capitalize text-sm hover:text-inherit',
                  productInSubCategory(category?.translation)
                    ? 'font-bold pb-3'
                    : ''
                )}
              >
                {category?.translation.name}
              </Typography>
              {!productInSubCategory(category?.translation) && (
                <ChevronRight className="hover:fill-inherit" />
              )}
            </div>
            {productInSubCategory(category?.translation) && (
              <ul className="p-3">
                {category?.subCategories?.map((subCategory: any, j: number) => (
                  <li
                    className={cn(
                      'capitalize py-1 text-sm text-gray-500 hover:text-primary',
                      hasCategoryId(subCategory.id) ? 'font-bold' : ''
                    )}
                    key={j}
                    onClick={() => {
                      const query = getSearchParam({
                        name: 'categorySlug',
                        value: `${category?.translation.slug},${category?.translation.id}`,
                        searchParams,
                      })
                      const query2 = getSearchParam({
                        name: 'subCategorySlug',
                        value: `${subCategory.slug},${subCategory.id}`,
                        searchParams,
                      })

                      const properLang = lang ? lang : ''
                      console.log(
                        `/${properLang}/product/finder${query}${query2}`
                      )

                      router.push(
                        `/${properLang}/product/finder${query}&${query2.replace(
                          '?',
                          ''
                        )}`
                      )
                    }}
                  >
                    {subCategory.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
