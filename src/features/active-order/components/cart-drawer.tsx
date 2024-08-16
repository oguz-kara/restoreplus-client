'use client'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useDictionary } from '@/context/use-dictionary'
import { ServerImage } from '@/components/ui/image'
import Typography from '@/components/ui/typography'
import { ArrowRight, Minus, Plus, ShoppingCart } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from '@/components/ui/link'
import { PropsWithLang } from '@/i18n/types'
import { formatPrice } from '@/utils/format-price'
import { usePathname } from 'next/navigation'
import { useActiveOrder } from '../context/use-active-order'
import { useCart } from '../context/use-cart-view'

export default function CartDrawer({ lang }: PropsWithLang) {
  const pathname = usePathname()
  const {
    dictionary: {
      activeOrder: { cart },
    },
  } = useDictionary()

  const { isOpen, setOpen } = useCart()
  const { activeOrder, removeOrderLineData, updateOrderLineQuantityData } =
    useActiveOrder()

  React.useEffect(() => {
    if (isOpen) setOpen(false)
  }, [pathname])

  if (!activeOrder || !activeOrder.lines || activeOrder.lines.length === 0)
    return null

  return (
    <Drawer open={isOpen} direction="right" onOpenChange={setOpen}>
      <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 lg:w-[500px] rounded-none">
        <ScrollArea>
          <div className="flex flex-col justify-between h-full mx-auto w-full max-w-sm pb-20">
            <div>
              <DrawerHeader>
                <DrawerTitle className="flex gap-2 items-center mb-2">
                  <ShoppingCart />
                  {cart.title}
                </DrawerTitle>
                <DrawerDescription>{cart.description}</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div>
                  {activeOrder?.lines?.length > 0 ? (
                    activeOrder?.lines?.map((line) => (
                      <div
                        key={line.id}
                        className="border-b border-gray-300 border-dashed py-5"
                      >
                        <div className="flex gap-5 mb-3">
                          <div className="flex-1">
                            <ServerImage
                              src={line.product.featuredImage?.path || '/'}
                              alt={line.product.featuredImage?.alt || 'image'}
                              width={300}
                              height={300}
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'contain',
                              }}
                            />
                          </div>
                          <div className="flex-[2]">
                            <Typography className="mb-2" as="h6">
                              {line.product.name}
                            </Typography>
                            <Typography className="text-xs mb-2">
                              {line.product.productType}
                            </Typography>
                            <Typography className="text-sm mb-2">
                              {`${line.quantity} x ${formatPrice(
                                line.price.value || 0,
                                activeOrder.currencyCode || 'USD'
                              )}`}
                            </Typography>
                            <Typography className="text-sm font-semibold">
                              {`Toplam: ${formatPrice(
                                line.price.value * line.quantity || 0,
                                activeOrder.currencyCode || 'USD'
                              )}`}
                            </Typography>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex flex-1 gap-2">
                            <Button
                              className="flex-1"
                              onClick={async () =>
                                await updateOrderLineQuantityData?.mutate({
                                  lineId: line.id,
                                  quantity:
                                    line.quantity - 1 <= 1
                                      ? 1
                                      : line.quantity - 1,
                                })
                              }
                            >
                              <Minus size="20px" />
                            </Button>
                            <Input
                              type="number"
                              className="flex-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none.currentTarget.value,e"
                              value={line.quantity}
                              onChange={async (e) =>
                                await updateOrderLineQuantityData?.mutate({
                                  lineId: line.id,
                                  quantity: Number.isNaN(
                                    Number(e.currentTarget.value)
                                  )
                                    ? 1
                                    : Number(e.currentTarget.value),
                                })
                              }
                            />
                            <Button
                              className="flex-1"
                              onClick={async () =>
                                await updateOrderLineQuantityData?.mutate({
                                  lineId: line.id,
                                  quantity:
                                    line.product.stockQuantity -
                                      line.quantity +
                                      1 <=
                                    0
                                      ? line.product.stockQuantity
                                      : line.quantity + 1,
                                })
                              }
                            >
                              <Plus size="20px" />
                            </Button>
                          </div>
                          <div className="flex-1 text-right">
                            <Button
                              variant="ghost"
                              onClick={async () =>
                                await removeOrderLineData?.mutate({
                                  lineId: line.id,
                                })
                              }
                            >
                              <Typography className="text-sm text-red-500 underline">
                                {cart.actions.removeLine}
                              </Typography>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <Typography className="mb-2">
                        {cart.emptyCartMessage}
                      </Typography>
                      <Link href="/create-order" lang={lang}>
                        <Button className="flex items-center justify-center gap-2">
                          <Typography>{cart.emptyCartAction}</Typography>
                          <div>
                            <ArrowRight />
                          </div>
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {activeOrder?.lines?.length === 0 ? null : (
          <DrawerFooter
            className="w-full absolute bottom-0 bg-white"
            style={{
              boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset',
            }}
          >
            <div className="mb-5">
              <Typography as="h4">
                Genel toplam:{' '}
                {formatPrice(
                  activeOrder.priceSummary.netPrice || 0,
                  activeOrder.currencyCode || 'USD'
                )}
              </Typography>
            </div>
            <div className="flex gap-5">
              <DrawerClose
                asChild
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                <Button variant="outline">{cart.actions.continue}</Button>
              </DrawerClose>
              <Link className="flex-1" lang={lang} href="/checkout">
                <Button className="w-full">{cart.actions.approveCart}</Button>
              </Link>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}
