'use client'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@/components/ui/drawer'
import Link from '@/components/ui/link'
import { ScrollArea } from '@/components/ui/scroll-area'
import Typography from '@/components/ui/typography'
import { useDictionary } from '@/context/use-dictionary-v2'
import { ChevronLeft } from 'lucide-react'
import { ServerImage } from '../ui/image'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ApplicationScopesDrawer({
  applicationScopes,
  setOpen,
  open,
}: {
  applicationScopes: ApplicationScope[] | null | undefined
  setOpen: any
  open: boolean
}) {
  const pathname = usePathname()
  const { dictionary: dict, lang } = useDictionary()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div>
      <Drawer direction="left" onOpenChange={setOpen} open={open}>
        <DrawerContent className="top-0 mt-0 h-screen rounded-none lg:max-w-[400px]">
          <DrawerHeader className="text-left">
            <div className="flex justify-between items-center">
              <div>
                <DrawerClose>
                  <Button className="p-0" variant="ghost">
                    <ChevronLeft />
                  </Button>
                </DrawerClose>
              </div>
            </div>
          </DrawerHeader>
          <ScrollArea>
            {applicationScopes && applicationScopes?.length > 0 ? (
              applicationScopes.map((item) => (
                <Link
                  href={`/application-scope/${item.translation.slug}`}
                  key={item.id}
                  lang={lang}
                >
                  <div className="flex gap-5 items-center mb-3 px-5 py-3">
                    <div>
                      <ServerImage
                        className="w-[50px] h-[50px] object-cover rounded-full"
                        src={
                          item.featuredImage?.path || '/image-placeholder.png'
                        }
                        width={50}
                        height={50}
                        alt="test"
                      />
                    </div>
                    <div>
                      <Typography>{item.translation.name}</Typography>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <Typography className="p-5">Nothing to show!</Typography>
            )}
          </ScrollArea>
          <DrawerFooter className="pb-14">
            <Link href="/application-scopes" lang={lang} className="w-full">
              <Button type="button" className="p-7 w-full">
                <Typography className="md:text-lg font-semibold uppercase">
                  {dict.common.browse_our_application_scopes_text}
                </Typography>
              </Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
