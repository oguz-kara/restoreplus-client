import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Locale } from '@/i18n/types'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { LogIn, LogOut, Menu, Search, User, X } from 'lucide-react'
import Link from '../ui/link'
import Logo from './logo'
import Typography from '../ui/typography'
import PickLocaleAndCurrencyCard from '@/features/locale/components/pick-locale-and-currency-card'
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import { usePathname } from 'next/navigation'
import { ScrollArea } from '../ui/scroll-area'
import { useDictionaryV2 } from '@/context/use-dictionary-v2'

export default function NavbarMobile({
  lang,
  className,
}: {
  categoryData: {
    data: BlogPostCategoryWithOneTranslation[]
    pagination: Pagination
  } | null
  lang: Locale
} & PropsWithClassName) {
  const pathname = usePathname()
  const [isOpen, setOpen] = useState<boolean>(false)
  const { user, logout } = useAuthenticatedUser()
  const { dictionary: dict } = useDictionaryV2()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div className={cn(className)}>
      <Drawer direction="left" onOpenChange={setOpen} open={isOpen}>
        <DrawerTrigger>
          <Menu size="30px" />
        </DrawerTrigger>
        <DrawerContent className="top-0 mt-0 h-screen rounded-none">
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
                <div>
                  <Logo color="black" width={100} />
                </div>
                <div>
                  <Link href="/product/finder" lang={lang}>
                    <Button className="p-0" variant="ghost">
                      <Search />
                    </Button>
                  </Link>
                </div>
              </div>
              {user && (
                <Typography className="text-lg py-3" as="h3">
                  <span className="font-normal italic">
                    {'Welcome no translate'}
                  </span>{' '}
                  {user.name}
                </Typography>
              )}
            </DrawerHeader>
            <div className="mx-auto w-full h-full max-w-sm">
              <DrawerDescription>
                <ul>
                  <li className="border-b  border-t border-gray-200">
                    <Link href="/product/finder" lang={lang}>
                      <Typography
                        as="p"
                        className="text-black px-5 py-2 uppercase font-semibold"
                      >
                        {'product finder no translate'}
                      </Typography>
                    </Link>
                  </li>
                  <li className="border-b border-gray-200">
                    <Link href="/" lang={lang}>
                      <Typography
                        as="p"
                        className="text-black px-5 py-2 uppercase font-semibold"
                      >
                        {'home no translate'}
                      </Typography>
                    </Link>
                  </li>
                  <li className="border-b border-gray-200">
                    <Link href="/about" lang={lang}>
                      <Typography
                        as="p"
                        className="text-black px-5 py-2 uppercase font-semibold"
                      >
                        {dict.about.hero_title}
                      </Typography>
                    </Link>
                  </li>
                  {!user ? (
                    <>
                      <li className="border-b border-gray-200">
                        <Link
                          href="/login"
                          lang={lang}
                          className="flex items-center px-5 py-2"
                        >
                          <LogIn color="black" size="24px" />
                          <Typography
                            as="p"
                            className="text-black uppercase font-bold px-2"
                          >
                            {dict.common.login_text}
                          </Typography>
                        </Link>
                      </li>
                      <li className="border-b border-gray-200">
                        <Link
                          href="/register"
                          lang={lang}
                          className="flex items-center px-5 py-2"
                        >
                          <User color="black" size="24px" />
                          <Typography
                            as="p"
                            className="text-black uppercase font-bold px-2"
                          >
                            {dict.register.title}
                          </Typography>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="border-b border-gray-200">
                        <Link
                          href="/profile"
                          lang={lang}
                          className="flex items-center px-5 py-2"
                        >
                          <User color="black" size="24px" />
                          <Typography
                            as="p"
                            className="text-black uppercase font-bold px-2"
                          >
                            {dict.common.profile_text}
                          </Typography>
                        </Link>
                      </li>
                      <li className="border-b border-gray-200">
                        <span
                          className="flex items-center px-5 py-2 cursor-pointer"
                          onClick={logout}
                        >
                          <LogOut color="black" size="24px" />
                          <Typography
                            as="p"
                            className="text-black uppercase font-bold px-2"
                          >
                            {dict.navbar.logout_text}
                          </Typography>
                        </span>
                      </li>
                    </>
                  )}
                </ul>
              </DrawerDescription>
              <DrawerFooter>
                <PickLocaleAndCurrencyCard />
              </DrawerFooter>
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
