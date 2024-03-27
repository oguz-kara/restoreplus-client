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
import { Menu, X } from 'lucide-react'
import Link from '../ui/link'
import Logo from './logo'
import Typography from '../ui/typography'

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
        <DrawerContent className="h-screen rounded-none px-5 bg-[rgba(0,0,0,0.7)]">
          <div className="mx-auto w-full h-full max-w-sm">
            <DrawerHeader className="flex justify-center">
              <Logo color="white" className="py-5" width={150} />
            </DrawerHeader>
            <DrawerDescription className="text-center">
              <ul className="text-4xl font-bold text-white">
                <li>
                  <Typography as="p" className="py-4">
                    <Link href="/" lang={lang}>
                      Home
                    </Link>
                  </Typography>
                </li>
                <li>
                  <Typography as="p" className="py-4">
                    <Link href="/" lang={lang}>
                      About Us
                    </Link>
                  </Typography>
                </li>
                <li>
                  <Typography as="p" className="py-4">
                    <Link href="/" lang={lang}>
                      Greases
                    </Link>
                  </Typography>
                </li>
                <li>
                  <Typography as="p" className="py-4">
                    <Link href="/" lang={lang}>
                      Specialty Oils
                    </Link>
                  </Typography>
                </li>
                <li>
                  <Typography as="p" className="py-4">
                    <Link href="/" lang={lang}>
                      Genuine Oil
                    </Link>
                  </Typography>
                </li>
                <li>
                  <Typography as="p" className="py-4">
                    <Link href="/" lang={lang}>
                      Services
                    </Link>
                  </Typography>
                </li>
              </ul>
            </DrawerDescription>
            <DrawerFooter>
              <Button>
                <Typography className="text-2xl">
                  <Link href="/login" lang={lang}>
                    Login
                  </Link>
                </Typography>
              </Button>
              <DrawerClose className="absolute top-1 right-1">
                <Button variant="outline">
                  <X />
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
