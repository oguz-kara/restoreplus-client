'use client'
import { Button } from '@/components/ui/button'
import { ServerImage } from '@/components/ui/image'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { useDictionary } from '@/context/use-dictionary'
import { useDictionary } from '@/context/use-dictionary-v2'
import { useOfferProducts } from '@/context/use-offer-products'
import { Trash2 } from 'lucide-react'
import React, { useEffect } from 'react'

export default function ListProducts() {
  const { offerProducts, deleteOfferProductById } = useOfferProducts()

  const { lang } = useDictionary()

  useEffect(() => {
    console.log({ offerProducts })
  }, [offerProducts])

  if (offerProducts.length === 0)
    return (
      <Link href={`/product/finder`} lang={lang}>
        <Button className="my-5 font-semibold text-md">
          Add some products
        </Button>
      </Link>
    )

  return (
    <div>
      {offerProducts?.map((item) => (
        <div
          key={item.product.id}
          className="flex gap-5 items-center justify-between mb-3 px-5 py-3 bg-gray-100 rounded-md"
        >
          <div className="flex gap-3">
            <div>
              <ServerImage
                className="w-[50px] h-[50px] object-contain"
                src={item.product.featuredImage?.path || ''}
                alt={item.product.featuredImage?.alt || 'image'}
                width={50}
                height={50}
              />
            </div>
            <div>
              <Typography className="leading-6 mb-1">
                {item.product.name}
              </Typography>
              <Typography className="text-xs">
                {item.product.translation.productType}
              </Typography>
            </div>
          </div>
          <div>
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => deleteOfferProductById(item.product.id)}
            >
              <Trash2 size="18px" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
