import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Locale } from '@/i18n/types'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import {
  Building2,
  Group,
  Handshake,
  Home,
  Languages,
  List,
  LogIn,
  LogOut,
  Menu,
  Search,
  SearchCheck,
  User,
  Wrench,
  X,
} from 'lucide-react'
import Link from '../ui/link'
import Logo from './logo'
import Typography from '../ui/typography'
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import { usePathname } from 'next/navigation'
import { ScrollArea } from '../ui/scroll-area'
import { useDictionary } from '@/context/use-dictionary-v2'
import CategoriesDrawer from './categories-drawer'
import ApplicationScopesDrawer from './application-scopes-drawer'
import LanguageCurrencyDrawer from './language-currency-drawer'

export default function NavbarMobile({
  lang,
  className,
  categoryData,
  applicationScopeData,
  localesData,
  currenciesData,
}: {
  categoryData: {
    data: ProductCategory[]
    pagination: Pagination
  } | null
  localesData: {
    data: SupportedLocale[]
    pagination: Pagination
  } | null
  currenciesData: {
    data: Currency[]
    pagination: Pagination
  } | null
  applicationScopeData: {
    data: ApplicationScope[]
    pagination: Pagination
  } | null
  lang: Locale
} & PropsWithClassName) {
  const pathname = usePathname()
  const [isOpen, setOpen] = useState<boolean>(false)
  const { user, logout } = useAuthenticatedUser()
  const { dictionary: dict } = useDictionary()
  const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false)
  const [applicationScopesOpen, setApplicationScopesOpen] =
    useState<boolean>(false)
  const [localesAndCurrenciesOpen, setLocalesAndCurrenciesOpen] =
    useState<boolean>(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div className={cn(className)}>
      <Drawer direction="left" onOpenChange={setOpen} open={isOpen}>
        <DrawerTrigger>
          <Menu size="30px" />
        </DrawerTrigger>
        <DrawerContent className="top-0 mt-0 h-screen rounded-none pb-10">
          <ScrollArea className="pb-16">
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
                    {dict.common.welcome_text}
                  </span>{' '}
                  {user.name}
                </Typography>
              )}
            </DrawerHeader>
            <div className="mx-auto w-full h-full px-5">
              <ul>
                <li className="border-b border-gray-200 py-3">
                  <Link
                    href="/"
                    lang={lang}
                    className="flex items-center gap-5"
                  >
                    <Home size="24px" color="#606060" />
                    <Typography
                      as="p"
                      className="text-gray-700 py-2 font-semibold"
                    >
                      {dict.common.home_text}
                    </Typography>
                  </Link>
                </li>
                <li className="border-b border-gray-200 py-3">
                  <Link
                    href="/product/finder"
                    lang={lang}
                    className="flex items-center gap-5"
                  >
                    <SearchCheck size="24px" color="#606060" />
                    <Typography
                      as="p"
                      className="text-gray-700  py-2 font-semibold"
                    >
                      {dict.navbar.find_product_text}
                    </Typography>
                  </Link>
                </li>
                <li
                  className="border-b border-gray-200 py-3 cursor-pointer flex items-center gap-5"
                  onClick={() => setCategoriesOpen(true)}
                >
                  <List size="24px" color="#606060" />
                  <Typography
                    as="p"
                    className="text-gray-700  py-2 font-semibold"
                  >
                    {dict.common.categories_text}
                  </Typography>
                </li>
                <li
                  className="border-b border-gray-200 py-3 flex items-center gap-5 cursor-pointer"
                  onClick={() => setApplicationScopesOpen(true)}
                >
                  <Wrench size="24px" color="#606060" />
                  <Typography
                    as="p"
                    className="text-gray-700  py-2 font-semibold"
                  >
                    {dict.common.application_scopes_text}
                  </Typography>
                </li>
                <li className="border-b border-gray-200 py-3">
                  <Link
                    href="/about"
                    lang={lang}
                    className="flex items-center gap-5"
                  >
                    <Building2 size="24px" color="#606060" />
                    <Typography
                      as="p"
                      className="text-gray-700  py-2 font-semibold"
                    >
                      {dict.about.hero_title}
                    </Typography>
                  </Link>
                </li>
                {!user ? (
                  <>
                    <li className="border-b border-gray-200 py-3">
                      <Link
                        href="/login"
                        lang={lang}
                        className="flex items-center py-3 gap-5"
                      >
                        <LogIn size="24px" color="#606060" />
                        <Typography as="p" className="text-gray-700 font-bold">
                          {dict.common.login_text}
                        </Typography>
                      </Link>
                    </li>
                    <li className="border-b border-gray-200 py-3">
                      <Link
                        href="/register"
                        lang={lang}
                        className="flex items-center py-3 gap-5"
                      >
                        <User size="24px" color="#606060" />
                        <Typography as="p" className="text-gray-700 font-bold">
                          {dict.register.title}
                        </Typography>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="border-b border-gray-200 py-3">
                      <Link
                        href="/profile"
                        lang={lang}
                        className="flex items-center py-2"
                      >
                        <User size="24px" color="#606060" />
                        <Typography
                          as="p"
                          className="text-gray-700 font-bold px-2"
                        >
                          {dict.common.profile_text}
                        </Typography>
                      </Link>
                    </li>
                    <li className="border-b border-gray-200 py-3">
                      <span
                        className="flex items-center py-2 cursor-pointer"
                        onClick={logout}
                      >
                        <LogOut color="#606060" size="24px" />
                        <Typography
                          as="p"
                          className="text-gray-700 font-bold px-2"
                        >
                          {dict.navbar.logout_text}
                        </Typography>
                      </span>
                    </li>
                  </>
                )}
                <li className="border-b border-gray-200 py-3">
                  <Link
                    href="/partner-register"
                    lang={lang}
                    className="flex items-center py-3 gap-5"
                  >
                    <Handshake size="24px" color="#606060" />
                    <Typography as="p" className="text-gray-700 font-bold">
                      {dict.common.partner_with_us_text}
                    </Typography>
                  </Link>
                </li>
                <li
                  className="border-b border-gray-200 py-3 flex items-center gap-5 cursor-pointer"
                  onClick={() => setLocalesAndCurrenciesOpen(true)}
                >
                  <Languages size="24px" color="#606060" />
                  <Typography
                    as="p"
                    className="text-gray-700  py-2 font-semibold"
                  >
                    {dict.navbar.languages_and_currencies_text}
                  </Typography>
                </li>
              </ul>
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
      <CategoriesDrawer
        categories={categoryData?.data}
        open={categoriesOpen}
        setOpen={setCategoriesOpen}
      />
      <ApplicationScopesDrawer
        applicationScopes={applicationScopeData?.data}
        open={applicationScopesOpen}
        setOpen={setApplicationScopesOpen}
      />
      <LanguageCurrencyDrawer
        locales={localesData?.data || []}
        currencies={currenciesData?.data || []}
        open={localesAndCurrenciesOpen}
        setOpen={setLocalesAndCurrenciesOpen}
      />
    </div>
  )
}
