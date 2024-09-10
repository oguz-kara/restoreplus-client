'use client'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@/components/ui/drawer'
import { ServerImage } from '@/components/ui/image'
import Link from '@/components/ui/link'
import { ScrollArea } from '@/components/ui/scroll-area'
import Typography from '@/components/ui/typography'
import { useDictionary } from '@/context/use-dictionary'
import { useOfferProducts } from '@/context/use-offer-products'
import { Trash2, X } from 'lucide-react'

export default function OfferProductsDrawer() {
  const {
    drawerOpen,
    setDrawerOpen,
    offerProducts: offerProductsList,
    deleteOfferProductById,
  } = useOfferProducts()
  const {
    lang,
    dictionary: { offerProducts },
  } = useDictionary()

  return (
    <div>
      <Drawer direction="left" onOpenChange={setDrawerOpen} open={drawerOpen}>
        <DrawerContent className="top-0 mt-0 h-screen rounded-none lg:max-w-[400px]">
          <ScrollArea>
            <DrawerHeader className="text-left">
              <div className="flex justify-between items-center">
                <div>
                  <DrawerClose>
                    <Button className="p-0" variant="ghost">
                      <X />
                    </Button>
                  </DrawerClose>
                </div>
              </div>
            </DrawerHeader>
            <div>
              {offerProductsList.length > 0 ? (
                offerProductsList.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-5 items-center justify-between mb-3 px-5 py-3"
                  >
                    <div className="flex gap-1">
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
                        <Typography>{item.product.name}</Typography>
                        <Typography className="text-xs">
                          {item.product.translation.productType}
                        </Typography>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        onClick={() => deleteOfferProductById(item.product.id)}
                      >
                        <Trash2 size="18px" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <Typography className="p-5">
                  {offerProducts.emptyList}
                </Typography>
              )}
            </div>
          </ScrollArea>
          <DrawerFooter>
            <Link href="/offer" lang={lang} className="w-full">
              <Button type="button" className="p-7 w-full">
                <Typography className="text-lg font-semibold uppercase">
                  {offerProducts.requestOfferText}
                </Typography>
              </Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}