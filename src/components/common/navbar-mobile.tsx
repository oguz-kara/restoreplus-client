import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { Locale } from '@/i18n/types'
import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'

export default function NavbarMobile({
  categoryData,
  lang,
  className,
}: {
  categoryData: {
    data: BlogPostCategoryWithOneTranslation[]
    pagination: Pagination
  } | null
  lang: Locale
} & PropsWithClassName) {
  return (
    <div className={cn(className)}>
      <Drawer direction="left">
        <DrawerTrigger>
          <Button>
            <Menu size="30px" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
