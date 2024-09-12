'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ClipboardList, X } from 'lucide-react'
import { useOfferProducts } from '@/context/use-offer-products'
import OfferProductsSuccessfullyAddedModal from '@/features/offer-products/components/offer-products-successfully-added-modal'
import OfferProductsDrawer from '@/features/offer-products/components/offer-products-drawer'
import { useDictionary } from '@/context/use-dictionary-v2'

interface Props {
  productData: Product
}

export default function AddProductToOfferButton({ productData }: Props) {
  const { dictionary: dict } = useDictionary()
  const [productsAddedModalOpen, setProductsAddedModalOpen] =
    useState<boolean>(false)
  const { addNewOfferProduct, deleteOfferProductById, offerProducts } =
    useOfferProducts()

  const hasOfferProducts = (productId: number) => {
    return offerProducts.find((product) => product?.product?.id === productId)
  }

  const handleAddProductToOfferList = () => {
    if (hasOfferProducts(productData?.id)) {
      deleteOfferProductById(productData.id)
    } else {
      setProductsAddedModalOpen(true)
      addNewOfferProduct(productData, 1)
    }
  }

  return (
    <>
      <OfferProductsDrawer />
      <div className="py-5">
        {hasOfferProducts(productData?.id) ? (
          <Button
            className="w-full p-7 text-xl bg-destructive"
            onClick={() => handleAddProductToOfferList()}
          >
            <X className="mr-2" />
            {dict.product_finder.remove_from_offer_list_button_text}
          </Button>
        ) : (
          <Button
            className="w-full p-7 text-xl"
            onClick={() => handleAddProductToOfferList()}
          >
            <ClipboardList className="mr-2" />
            {dict.product.single_product_request_offer_button_text}
          </Button>
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
    </>
  )
}
