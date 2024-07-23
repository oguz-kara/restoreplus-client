'use client'
import React, { PropsWithChildren } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import { useDictionary } from '@/context/use-dictionary'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { useOfferProducts } from '@/context/use-offer-products'
import { ServerImage } from '@/components/ui/image'
import Typography from '@/components/ui/typography'

export default function OfferProductsSuccessfullyAddedModal({
  onOpenChange,
  open,
  product,
}: {
  onOpenChange?: (val: boolean) => void
  open?: boolean
  product?: any
} & PropsWithChildren) {
  const {
    dictionary: {
      offerProducts: { offerProductSuccessfullyAdded },
    },
  } = useDictionary()

  const { setDrawerOpen } = useOfferProducts()

  const handleOpenDrawer = () => {
    setDrawerOpen(true)
    onOpenChange && onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[410px] p-5">
        <DialogHeader className="p-4 text-left">
          <DialogTitle>{offerProductSuccessfullyAdded.modalTitle}</DialogTitle>
          <DialogDescription>
            {offerProductSuccessfullyAdded.modalDescription}
          </DialogDescription>
          {product?.product && (
            <div className="flex gap-5 items-center justify-between mb-3 py-3">
              <div className="flex gap-1">
                <div>
                  <ServerImage
                    className="w-[50px] h-[50px] object-contain"
                    src={product.product?.featuredImage?.path || ''}
                    alt={product.product?.featuredImage?.alt || 'image'}
                    width={50}
                    height={50}
                  />
                </div>
                <div>
                  <Typography>{product.product?.name}</Typography>
                  <Typography className="text-xs">
                    {product.product?.translation.productType}
                  </Typography>
                </div>
              </div>
            </div>
          )}
        </DialogHeader>
        <DialogFooter className="flex gap-5">
          <DialogClose className="text-sm" type="button">
            {offerProductSuccessfullyAdded.closeButtonText}
          </DialogClose>
          <Button type="button" onClick={() => handleOpenDrawer()}>
            {offerProductSuccessfullyAdded.viewButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
