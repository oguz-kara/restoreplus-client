'use client'
import serverConfig from '@/config/server-config.json'
import Typography from '@/components/ui/typography'
import Image from '@/components/ui/image'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from '@/components/ui/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Locale } from '@/i18n/types'
import { useDictionary } from '@/context/use-dictionary'
import { useEffect, useState } from 'react'
import { formatPrice } from '@/utils/format-price'
import { useActiveOrder } from '@/features/active-order/context/active-order-context'

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
  const {
    dictionary: {
      productFinder,
      createOrderPage,
      activeOrder: { cart },
    },
  } = useDictionary()
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const { activeOrder } = useActiveOrder()

  const { adjustOrderLine, temporarilyOpen, adjustingOrderLine } =
    useActiveOrder()

  const getSelectedVariant = (id: number | null) => {
    if (!id) return null
    return product?.variants?.find((variant: any) => variant.id === id)
  }

  const handleAddToCartClick = async (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    await adjustOrderLine({
      productVariantId: selectedSize as number,
      quantity: 1,
      currencyCode: 'USD',
    })

    temporarilyOpen(2000)
  }

  const isProductVariantAddedToCart = (variantId: number | undefined) => {
    if (!variantId) return false
    return activeOrder?.lines?.find(
      (line) => line.productVariant.id === variantId
    )
  }

  const isAddedToCart = isProductVariantAddedToCart(selectedSize as number)

  useEffect(() => {
    if (product?.variants && product?.variants?.length > 0)
      setSelectedSize(product?.variants[0].id)
  }, [product])

  return (
    <div className="h-full mb-2" {...rest}>
      <Link href={`/product/${product.id}/${product.slug}`} lang={lang}>
        <Card className="h-full flex justify-between flex-col lg:flex-row">
          <div className="flex flex-col lg:flex-row">
            <CardHeader className="relative">
              {product.reductionDiscounts ? (
                <div className="absolute top-[-5px] left-[-5px]">
                  <div className="flex ">
                    <Badge className="bg-primary text-xs rounded-none rounded-l-sm">
                      {product.reductionDiscounts.type === 'PERCENTAGE'
                        ? `%${product.reductionDiscounts.value} ${createOrderPage.reduction}`
                        : null}
                    </Badge>
                    {product.sectorsDiscounts &&
                      product.sectorsDiscounts.length > 0 && (
                        <Badge className="bg-primary text-xs rounded-none rounded-r-sm">
                          {getTotalSectorDiscountPercentage(
                            product.sectorsDiscounts,
                            createOrderPage.sectorDiscount
                          )}
                        </Badge>
                      )}
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
                {product.productType}
              </Typography>
              <div className="mb-2">
                <Typography as="h6" className="font-semibold text-xs mb-2">
                  Boyut seçin
                </Typography>
                <div className="flex gap-2">
                  {product?.variants?.map((item: any) => (
                    <Button
                      variant={
                        selectedSize === item.id ? 'default' : 'secondary'
                      }
                      key={item.id}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setSelectedSize(item.id)
                      }}
                    >
                      <Typography className="text-sm ">{item.value}</Typography>
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Typography as="h6" className="font-semibold text-xs mb-2">
                  Fiyat
                </Typography>
                <div className="flex gap-2 items-center">
                  {getSelectedVariant(selectedSize)?.totalDiscount &&
                    getSelectedVariant(selectedSize)?.totalDiscount > 0 && (
                      <Typography className="text-gray-400 font-[300] text-xs line-through">
                        {formatPrice(
                          getSelectedVariant(selectedSize)?.price,
                          product.currencyCode
                        )}
                      </Typography>
                    )}
                  <Typography className="font-semibold">
                    {formatPrice(
                      getSelectedVariant(selectedSize)?.calculatedPrice,
                      product.currencyCode
                    )}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </div>
          <CardFooter className="relative flex items-end">
            {term && product.equivalents?.includes(term) ? (
              <Badge className="absolute top-[-5px] right-[-5px]">
                <Typography>{productFinder.equivalent}</Typography>
              </Badge>
            ) : null}
            <div className="flex flex-row lg:flex-col gap-3 lg:gap-0">
              <div>
                <Button className="mb-1" variant="secondary">
                  {createOrderPage.details}
                </Button>
              </div>
              <div>
                <Button
                  loading={adjustingOrderLine}
                  className="flex-1 bg-green-600 text-white w-full"
                  onClick={handleAddToCartClick}
                  disabled={
                    Boolean(isAddedToCart) ||
                    !product?.variants ||
                    product.variants.length === 0
                  }
                >
                  {isAddedToCart
                    ? cart.addedToCartButtonText
                    : createOrderPage.addToCart}
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  )
}

function getTotalSectorDiscountPercentage(sectorsDiscounts: any, text: string) {
  const percentage =
    sectorsDiscounts && sectorsDiscounts.length > 0
      ? sectorsDiscounts.reduce(
          (accumulator: number, currentValue: any) =>
            currentValue.type === 'PERCENTAGE'
              ? currentValue.value + accumulator
              : accumulator,
          0
        )
      : null

  return percentage ? `%${percentage} ${text}` : null
}
