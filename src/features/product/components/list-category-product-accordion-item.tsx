'use client'
import React, { useEffect, useState } from 'react'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Image, { ServerImage } from '@/components/ui/image'
import Typography from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useMutation } from '@/hooks/use-mutation'
import { ListCategoryDataType } from './list-category-product-accordion'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, ClipboardList } from 'lucide-react'
import ToolTipStyled from '@/components/common/tooltip'
import { useSearchParams } from 'next/navigation'
import Link from '@/components/ui/link'
import { useOfferProducts } from '@/context/use-offer-products'
import OfferProductsSuccessfullyAddedModal from '@/features/offer-products/components/offer-products-successfully-added-modal'
import { useDictionary } from '@/context/use-dictionary-v2'

export default function ListCategoryProductAccordionItem({
  category,
  i,
  filters,
  ...rest
}: {
  category: ListCategoryDataType
  i: number
  filters?: { sectorId?: string | null; applicationScopeId?: string | null }
}) {
  const { addNewOfferProduct, offerProducts } = useOfferProducts()
  const [productsAddedModalOpen, setProductsAddedModalOpen] =
    useState<boolean>(false)
  const { dictionary: dict, lang } = useDictionary()
  const {
    mutateAsync,
    data: productData,
    isPending,
  } = useMutation<{ data: Product[] | undefined; pagination: Pagination }>()
  const searchParams = useSearchParams()

  const getProductsByFields = async (categoryId: number) => {
    const facetValues = searchParams.get('facetValues')
    const facetValueIds =
      facetValues && facetValues.length > 0
        ? facetValues?.split('-').map((item) => Number(item))
        : undefined
    const data = await mutateAsync({
      path: `/product/by-fields?lang=${lang}`,
      body: {
        categoryId: categoryId && Number(categoryId),
        sectorId: filters?.sectorId && Number(filters?.sectorId),
        applicationScopeId:
          filters?.applicationScopeId && Number(filters?.applicationScopeId),
        term: searchParams.get('term'),
        facetValueIds,
      },
      method: 'POST',
    })

    return data
  }

  const handleAddProductToOfferList = (product: Product) => {
    const isSuccessfullyAdded: any = addNewOfferProduct(product, 1)
    if (isSuccessfullyAdded) setProductsAddedModalOpen(true)
  }

  useEffect(() => {
    getProductsByFields(category.id)
  }, [searchParams, category.id])

  return (
    <AccordionItem
      value={i.toString()}
      className={cn('border-none', (i + 1) % 3 === 0 ? 'mb-20' : 'mb-3')}
      onClick={async () => await getProductsByFields(category.id)}
      {...rest}
    >
      <AccordionTrigger className="bg-white rounded-sm p-7 w-full hover:no-underline">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {category.icon ? (
              <ServerImage
                className="w-[30px] h-[30px] mr-5"
                src={category?.icon?.path || '/'}
                width={30}
                height={30}
                alt={category?.icon?.path || 'image'}
              />
            ) : (
              <Image
                className="w-[30px] h-[30px] mr-5"
                src={'/images/category-icon-placeholder.svg'}
                width={30}
                height={30}
                alt={'category image placeholder'}
              />
            )}
            <div>
              <Typography
                as="h3"
                className="text-left text-2xl font-bold w-full"
              >
                <span>{category.name}</span>
              </Typography>
              <Typography className="text-left text-gray-400 uppercase">
                {category.shortDescription}
              </Typography>
            </div>
          </div>
          <div>
            <Badge className="mx-2 text-sm bg-[#ccae0030]">
              {category.productCount}
            </Badge>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-7 bg-white">
        <Typography className="text-md text-md text-gray-500">
          {category.metaDescription}
        </Typography>
        <div className="py-5">
          {isPending
            ? [1, 2, 3, 4, 5].map((item) => (
                <Skeleton key={item} className="mb-3 w-full h-[85px]" />
              ))
            : (Array.isArray(productData?.data) ? productData.data : [])?.map(
                (product, i) => (
                  <div
                    key={i}
                    className="flex justify-between mb-3 bg-gray-100 p-3 rounded-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <ServerImage
                          className="w-[75px] h-[75px] object-contain"
                          src={product?.featuredImage?.path || '/'}
                          width={100}
                          height={100}
                          alt={product?.featuredImage?.alt || 'product image'}
                        />
                      </div>
                      <div>
                        <Typography
                          as="h3"
                          className="leading-5 text-[#e1a500] font-bold mb-2 uppercase text-xl"
                        >
                          {product.name}
                        </Typography>
                        <Typography className="text-md font-semibold text-gray-700 mb-2 uppercase">
                          {product.translation.productType}
                        </Typography>
                        <div>
                          {product.categories.map((category, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <div>
                                {category.icon?.path ? (
                                  <ServerImage
                                    src={category?.icon?.path || '/'}
                                    width={20}
                                    height={20}
                                    alt={category?.icon?.alt || 'icon'}
                                  />
                                ) : (
                                  <Image
                                    src="/images/category-icon-placeholder.svg"
                                    width={20}
                                    height={20}
                                    alt={'category icon'}
                                  />
                                )}
                              </div>
                              <Typography className="text-md text-gray-500 font-semibold">
                                {category.translation.name}
                              </Typography>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <ToolTipStyled
                          text={dict.product_finder.add_to_offer_list_tooltip}
                        >
                          <Button
                            variant="outline"
                            className="mb-1 block flex-1 bg-transparent px-3"
                            onClick={() => handleAddProductToOfferList(product)}
                          >
                            {offerProducts.find(
                              (item) => item.product.id === product.id
                            ) ? (
                              <Check color="green" />
                            ) : (
                              <ClipboardList color="gray" />
                            )}
                          </Button>
                        </ToolTipStyled>
                        <ToolTipStyled
                          text={dict.product_finder.see_details_tooltip}
                        >
                          <Link
                            href={`/product/${product.translation.slug}?redirectBack=product.finder`}
                            lang={lang}
                          >
                            <Button className="block px-3" type="button">
                              <ArrowRight />
                            </Button>
                          </Link>
                        </ToolTipStyled>
                      </div>
                    </div>
                  </div>
                )
              )}
          <OfferProductsSuccessfullyAddedModal
            open={productsAddedModalOpen}
            onOpenChange={setProductsAddedModalOpen}
            product={
              offerProducts.length > 0
                ? offerProducts[offerProducts.length - 1]
                : undefined
            }
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
