'use client'
import OfferProductsSuccessfullyAddedModal from '@/features/offer-products/components/offer-products-successfully-added-modal'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useMutation } from '@/hooks/use-mutation'
import Typography from '@/components/ui/typography'
import { ServerImage } from '@/components/ui/image'
import Link from '@/components/ui/link'
import { useDictionary } from '@/context/use-dictionary'
import { Locale } from '@/i18n/types'
import { Button } from '@/components/ui/button'
import Paginate from '@/components/common/pagination'
import { useOfferProducts } from '@/context/use-offer-products'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

function ProductCard({
  product,
  lang,
  translation,
}: {
  product: Product
  lang: Locale
  translation: any
}) {
  const { offerProducts, addNewOfferProduct, deleteOfferProductById } =
    useOfferProducts()
  const [productsAddedModalOpen, setProductsAddedModalOpen] =
    useState<boolean>(false)

  const hasProductInList = (productId: number) => {
    console.log({ offerProducts })
    return offerProducts.find((product) => product?.product?.id === productId)
  }

  const handleAddProductToOfferList = (product: Product) => {
    if (hasProductInList(product.id)) {
      deleteOfferProductById(product.id)
    } else {
      const isSuccessfullyAdded: any = addNewOfferProduct(product, 1)
      if (isSuccessfullyAdded) setProductsAddedModalOpen(true)
    }
  }

  return (
    <div
      className="bg-[#ffffff] p-5 rounded-lg flex flex-col gap-5 h-full"
      style={{
        boxShadow: '2px 4px 12px #00000014',
      }}
    >
      <Link
        href={`/product/${product.id}/${product.translation.slug}`}
        lang={lang}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-5 h-full">
          <div className="flex-1">
            <Typography as="h4" className="font-semibold text-xl mb-2">
              {product.name}
            </Typography>
            <Typography as="h6" className="font-semibold text-gray-500 text-sm">
              {product.translation.productType}
            </Typography>
          </div>
          <div className="flex justify-center flex-[2]">
            <ServerImage
              className="w-[150px] h-[150px] object-contain"
              src={product.featuredImage?.path || '/'}
              width={150}
              height={150}
              alt={product.featuredImage?.alt || 'image'}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {product.categories.map((category: ProductCategory, i: number) => (
              <div key={i} className="flex items-center gap-1">
                <div>
                  <ServerImage
                    src={category?.icon?.path || '/'}
                    width={16}
                    height={16}
                    alt={category?.icon?.alt || 'icon'}
                  />
                </div>
                <Typography className="text-sm text-gray-500">
                  {category.translation.name}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </Link>
      <div>
        <Button
          variant="outline"
          className={cn(
            'mb-1 block flex-1 bg-transparent px-3',
            hasProductInList(product.id) ? 'bg-destructive text-white' : ''
          )}
          onClick={(e) => {
            e.stopPropagation()
            handleAddProductToOfferList(product)
          }}
        >
          {hasProductInList(product.id) ? (
            <span className="flex items-center gap-1">
              <X size="15px" />
              {translation.addToOfferList.removeFromOfferListButtonText}
            </span>
          ) : (
            translation.addToOfferList.tooltip
          )}
        </Button>
      </div>
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
  )
}

export default function ListProductsCardsV2() {
  const { data, mutate } = useMutation<any>()
  const searchParams = useSearchParams()
  const sectorId = searchParams.get('sectorId')
  const categoryId = searchParams.get('categoryId')
  const applicationScopeId = searchParams.get('applicationScopeId')
  const term = searchParams.get('term')
  const {
    lang,
    dictionary: { productFinder },
  } = useDictionary()

  useEffect(() => {
    mutate({
      path: `/product/by-fields?lang=${lang}`,
      body: {
        categoryId: categoryId && Number(categoryId),
        sectorId: sectorId && Number(sectorId),
        applicationScopeId: applicationScopeId && Number(applicationScopeId),
        term: term,
      },
      method: 'POST',
    })
  }, [categoryId, sectorId, applicationScopeId, term, lang])

  return (
    <div>
      <div className="min-h-screen">
        <div className="grid lg:grid-cols-3 gap-5">
          {(data && Array.isArray(data?.data) ? data.data : []).map(
            (product: Product) => (
              <ProductCard
                key={product.id}
                lang={lang}
                product={product}
                translation={productFinder.productActionButtons}
              />
            )
          )}
        </div>
      </div>
      <div className="flex justify-center w-full">
        <Paginate
          url={`/${lang}/product/finder`}
          total={data?.pagination?.total || 25}
        />
      </div>
    </div>
  )
}
