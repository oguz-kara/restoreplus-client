'use client'
import serverConfig from '@/config/server-config.json'
import Typography from '@/components/ui/typography'
import Image from '@/components/ui/image'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from '@/components/ui/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Locale } from '@/i18n/types'
import { useEffect, useState } from 'react'
import { formatPrice } from '@/utils/format-price'
import { CalculatedProduct } from '../types'
import { useActiveOrder } from '@/features/active-order/context/use-active-order'
import { useDictionaryV2 } from '@/context/use-dictionary-v2'

export default function CalculatedProductForActiveUserCard({
  product,
  lang,
  term,
  ...rest
}: {
  product: CalculatedProduct
  lang: Locale
  term: string | undefined
}) {
  const { dictionary: dict } = useDictionaryV2()
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const { activeOrder, adjustOrderLineData } = useActiveOrder()

  const getSelectedVariant = (id: number | null) => {
    if (!id) return null
    return product?.variants?.find((variant) => variant.id === id)
  }

  const handleAddToCartClick = async (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    await adjustOrderLineData?.mutate({
      productVariantId: selectedSize as number,
      quantity: 1,
    })
  }

  const isProductVariantAddedToCart = (variantId: number | undefined) => {
    if (!variantId) return false
    return activeOrder?.lines?.find(
      (line) => line?.product?.variantId === variantId
    )
  }

  const isAddedToCart = isProductVariantAddedToCart(selectedSize as number)

  useEffect(() => {
    if (product?.variants && product?.variants?.length > 0)
      setSelectedSize(product?.variants[0].id)
  }, [product])

  return (
    <div className="h-full mb-2" {...rest}>
      <Card className="h-full flex justify-between flex-col lg:flex-row">
        <div className="flex flex-col lg:flex-row">
          <CardHeader className="relative">
            {product.reductionValue ? (
              <div className="absolute top-[-5px] left-[-5px]">
                <div className="flex ">
                  <Badge className="bg-primary text-xs rounded-none rounded-l-sm hover:bg-primary">
                    {product.reductionValue
                      ? `%${product.reductionValue} ${dict.create_order.reduction_text}`
                      : null}
                  </Badge>
                </div>
              </div>
            ) : null}
            <div>
              <Image
                src={`${serverConfig.remoteUrl}/${product.featuredImage?.path}`}
                alt={
                  product.featuredImage?.alt
                    ? product.featuredImage?.alt
                    : product.name
                }
                width={100}
                height={100}
                style={{
                  width: '150px',
                  height: '75px',
                  objectFit: 'contain',
                }}
              />
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <Typography as="h6" className="mb-1">
              {product.name}
            </Typography>
            <Typography className="text-xs mb-2">
              {product.translation.productType}
            </Typography>
            <div className="mb-2">
              <Typography as="h6" className="font-semibold text-xs mb-2">
                {dict.create_order.product_card_pick_dimention_text}
              </Typography>
              <div className="flex gap-2">
                {product?.variants?.map((item) => (
                  <Button
                    type="button"
                    variant={selectedSize === item.id ? 'default' : 'secondary'}
                    key={item.id}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setSelectedSize(item.id)
                    }}
                  >
                    <Typography className="text-sm ">
                      {item.translation.value}
                    </Typography>
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Typography
                as="h6"
                className="font-semibold text-xs mb-2 capitalize"
              >
                {dict.common.price_text}
              </Typography>
              <div className="flex gap-2 items-center">
                {getSelectedVariant(selectedSize)?.discount.reductionAmount &&
                  (getSelectedVariant(selectedSize)?.discount.reductionAmount ||
                    0) > 0 && (
                    <Typography className="text-gray-400 font-[300] text-xs line-through">
                      {formatPrice(
                        getSelectedVariant(selectedSize)?.price.brutto || 0,
                        product.currencyCode
                      )}
                    </Typography>
                  )}
                <Typography className="font-semibold">
                  {formatPrice(
                    getSelectedVariant(selectedSize)?.price?.value as number,
                    product.currencyCode
                  )}
                </Typography>
              </div>
            </div>
          </CardContent>
        </div>
        <CardFooter className="relative flex items-end">
          <div className="flex flex-row lg:flex-col gap-3 lg:gap-0">
            <div>
              <Link
                href={`/product/${product.id}/${product.translation.slug}?redirectBack=create-order`}
                lang={lang}
              >
                <Button className="mb-1" variant="secondary">
                  {dict.create_order.details_text}
                </Button>
              </Link>
            </div>
            <div>
              <Button
                loading={adjustOrderLineData?.isPending}
                className="flex-1 bg-green-600 text-white w-full"
                onClick={handleAddToCartClick}
                disabled={
                  Boolean(isAddedToCart) ||
                  !product?.variants ||
                  product.variants.length === 0
                }
              >
                {isAddedToCart
                  ? dict.create_order.cart_added_to_cart_button_text
                  : dict.create_order.add_to_cart_text}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
