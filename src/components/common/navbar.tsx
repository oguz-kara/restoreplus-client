'use client'
import serverConfig from '@/config/server-config.json'
import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import Logo from './logo'
import Link from '../ui/link'
import { Locale } from '@/i18n/types'
import { Button } from '../ui/button'
import {
  ChevronDown,
  ChevronRight,
  Globe,
  PlusSquare,
  ShoppingCart,
  User,
} from 'lucide-react'
import NavbarMobile from './navbar-mobile'
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import Container from './container'
import MegaMenu from './mega-menu'
import { useDisclosure } from '@/hooks/use-disclosure'
import useScrollPosition from '@/hooks/use-scroll-position'
import Image from '../ui/image'
import { usePathname, useRouter } from 'next/navigation'
import Typography from '../ui/typography'
import { Badge } from '../ui/badge'
import { useActiveOrder } from '@/features/active-order/context/use-active-order'
import { useCart } from '@/features/active-order/context/use-cart-view'
import { useDictionary } from '@/context/use-dictionary-v2'
import { ScrollArea } from '../ui/scroll-area'
import { useMutation } from '@/hooks/use-mutation'
import PickLocaleAndCurrencyCard from '@/features/locale/components/pick-locale-and-currency-card'
import LanguageCurrencyPicker from '@/features/locale/components/language-currency-picker'

export function NavigationBar({
  categoryData,
  applicationScopeData,
  localesData,
  currenciesData,
  lang,
  activeUser,
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
  activeUser: ActiveUser | null
}) {
  const { dictionary: dict } = useDictionary()
  const {
    open: openCategories,
    onClose: onCloseCategories,
    onOpen: onOpenCategories,
  } = useDisclosure()
  const {
    open: openSectors,
    onClose: onCloseSectors,
    onOpen: onOpenSectors,
  } = useDisclosure()
  const navbarRef = React.useRef<HTMLDivElement>(null)
  const [navbarHeight, setNavbarHeight] = React.useState(0)
  const scrollPosition = useScrollPosition()
  const pathname = usePathname()
  const isOnProductPage = pathname.includes('/product')
  const whiteState =
    openCategories || scrollPosition > 0 || isOnProductPage || openSectors

  React.useEffect(() => {
    if (navbarRef.current) {
      const height = navbarRef.current.offsetHeight
      setNavbarHeight(height)
    }
  }, [navbarRef, navbarRef.current?.offsetHeight])

  return (
    <div
      ref={navbarRef}
      className={cn(
        'fixed top-0 left-0 right-0',
        whiteState
          ? 'bg-white text-black  border-b border-gray-200'
          : 'bg-foreground text-white'
      )}
      style={{
        zIndex: 50,
      }}
    >
      <Container className={cn('px-2 py-0')}>
        <div>
          <div className={cn('hidden lg:flex justify-between')}>
            <div
              className={cn(
                'flex flex-[2] gap-4 font-semibold uppercase text-sm'
              )}
            >
              <div className="flex py-5 pr-5">
                <Link lang={lang} href="/">
                  <Logo
                    color={whiteState ? 'black' : 'white'}
                    width={120}
                    height={120}
                  />
                </Link>
              </div>
              <div className="flex items-center">
                <Link href="/product/finder" lang={lang}>
                  <Typography
                    className={cn(
                      whiteState ? 'text-black' : 'text-white',
                      'text-inherit font-inherit'
                    )}
                  >
                    {dict.navbar.find_product_text}
                  </Typography>
                </Link>
              </div>
              <div className="h-full">
                <MegaMenu
                  open={openCategories}
                  onClose={onCloseCategories}
                  onOpen={onOpenCategories}
                  trigger={
                    <div
                      className={cn(
                        'cursor-pointer h-full flex items-center',
                        openCategories ? 'border-b-4 border-primary' : ''
                      )}
                    >
                      <Typography
                        className={cn(
                          whiteState ? 'text-black' : 'text-white',
                          'text-sm font-inherit',
                          'leading-0 mr-1'
                        )}
                      >
                        {dict.navbar.products_by_category_text}
                      </Typography>
                      <ChevronDown
                        color={whiteState ? 'black' : 'white'}
                        className={cn(
                          openCategories ? 'rotate-180' : '',
                          'transition-all ease-in-out'
                        )}
                        size="15px"
                      />
                    </div>
                  }
                  content={
                    <ProductCategoryData
                      categoryData={categoryData?.data || []}
                      lang={lang}
                    />
                  }
                  top={navbarHeight}
                />
              </div>
              <div className="h-full">
                <MegaMenu
                  open={openSectors}
                  onClose={onCloseSectors}
                  onOpen={onOpenSectors}
                  trigger={
                    <div
                      className={cn(
                        'cursor-pointer h-full flex items-center',
                        openSectors ? 'border-b-4 border-primary' : ''
                      )}
                    >
                      <Typography
                        className={cn(
                          whiteState ? 'text-black' : 'text-white',
                          'text-sm font-inherit',
                          'leading-0 mr-1'
                        )}
                      >
                        {dict.navbar.products_by_sector_text}
                      </Typography>
                      <ChevronDown
                        color={whiteState ? 'black' : 'white'}
                        className={cn(
                          openSectors ? 'rotate-180' : '',
                          'transition-all ease-in-out'
                        )}
                        size="15px"
                      />
                    </div>
                  }
                  content={
                    <ApplicationScopeData
                      applicationScopeData={applicationScopeData?.data || []}
                      lang={lang}
                    />
                  }
                  top={navbarHeight}
                />
              </div>
            </div>
            <div className="flex justify-end flex-1 py-5">
              <RightNavigation user={activeUser} />
            </div>
          </div>
          <div className="flex items-center justify-between py-5 lg:hidden">
            <div className="block">
              <Link lang={lang} href="/">
                <Logo
                  color={whiteState ? 'black' : 'white'}
                  width={120}
                  height={120}
                />
              </Link>
            </div>
            <div>
              <NavbarMobile
                className="lg:hidden"
                categoryData={categoryData}
                applicationScopeData={applicationScopeData}
                localesData={localesData}
                currenciesData={currenciesData}
                lang={lang}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, href, lang, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          lang={(lang ? lang : 'en') as Locale}
          href={href ? href : '#'}
          outerRef={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

function ProductCategoryData({
  categoryData,
  lang,
}: {
  categoryData: ProductCategory[]
  lang: Locale
}) {
  const { dictionary: dict } = useDictionary()
  const [isSetInitialValue, setInitialValue] = React.useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] =
    React.useState<ProductCategory | null>(null)
  const [categories, setCategories] = React.useState<ProductCategory[]>([])
  const { data, mutate, isPending } = useMutation()

  const handleSelectedParentCategory = (category: any) => {
    setSelectedCategory(category)
  }

  const getActiveClass = (category: any, type: 'sub' | 'top' | 'bottom') => {
    if (
      type === 'top' &&
      selectedCategory &&
      Object.keys(selectedCategory)?.length > 0
    ) {
      // @ts-ignore
      return category.id === selectedCategory?.id ? 'bg-gray-100' : ''
    }

    return ''
  }

  React.useEffect(() => {
    if (categories && categories.length > 0) {
      handleSelectedParentCategory(categories[0])
    }
  }, [categories])

  React.useEffect(() => {
    if (categoryData && !isSetInitialValue) {
      setInitialValue(true)
      setCategories(
        categoryData.filter(({ parentCategory }) => !parentCategory)
      )
    }
  }, [categoryData, isSetInitialValue])

  React.useEffect(() => {
    if (selectedCategory) {
      mutate({
        method: 'GET',
        path: `/product?categoryId=${selectedCategory?.id}&lang=${lang}`,
      })
    }
  }, [selectedCategory])

  return (
    <Container>
      <div className="flex p-5 min-h-[50vh]">
        <ScrollArea className="flex-1 max-h-[50vh]">
          <ul>
            {categories
              .filter(({ parentCategory }) => !parentCategory)
              .map((category: ProductCategory, i) => (
                <Link
                  lang={lang}
                  key={i}
                  href={`/product/categories/${category?.translation?.slug}`}
                >
                  <li
                    className={cn(
                      'p-3 cursor-pointer hover:bg-gray-100 capitalize',
                      getActiveClass(category, 'top')
                    )}
                    onMouseOver={() => handleSelectedParentCategory(category)}
                  >
                    {category?.translation?.name}
                  </li>
                </Link>
              ))}
          </ul>
        </ScrollArea>
        <ScrollArea className="flex-[2] max-h-[50vh]">
          <div className="flex items-center gap-2 mb-5">
            <Typography as="h6" className="font-[600] pl-6 capitalize">
              {dict.common.products_text}
            </Typography>
            <ChevronRight size={15} />
          </div>
          <ul className="grid grid-cols-5 p-5">
            {(data as any)?.data?.map((product: Product, i: number) => (
              <Link
                lang={lang}
                key={i}
                href={`/product/${product.translation.slug}`}
              >
                <li className="flex flex-col items-center gap-2 justify-center p-3 cursor-pointer hover:bg-gray-200 capitalize">
                  <div>
                    <Image
                      className="rounded-full w-[50px] h-[50px]"
                      src={`${serverConfig.remoteUrl}/${product.featuredImage?.path}`}
                      alt={product.name}
                      width={50}
                      height={50}
                    />
                  </div>
                  <Typography className="text-sm text-center">
                    {product.name}
                  </Typography>
                </li>
              </Link>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </Container>
  )
}

function ApplicationScopeData({
  applicationScopeData,
  lang,
}: {
  applicationScopeData: ApplicationScope[]
  lang: Locale
}) {
  const { dictionary: dict } = useDictionary()
  const [isSetInitialValue, setInitialValue] = React.useState<boolean>(false)
  const [selectedApplicationScope, setSelectedApplicationScope] =
    React.useState<ApplicationScope | null>(null)
  const { data, mutate, isPending } = useMutation()

  const handleSelectedParentApplicationScope = (applicationScope: any) => {
    setSelectedApplicationScope(applicationScope)
  }

  const getActiveClass = (
    applicationScope: any,
    type: 'sub' | 'top' | 'bottom'
  ) => {
    if (
      type === 'top' &&
      selectedApplicationScope &&
      Object.keys(selectedApplicationScope)?.length > 0
    ) {
      // @ts-ignore
      return applicationScope.id === selectedApplicationScope?.id
        ? 'bg-gray-100'
        : ''
    }

    return ''
  }

  React.useEffect(() => {
    if (applicationScopeData && applicationScopeData.length > 0) {
      handleSelectedParentApplicationScope(applicationScopeData[0])
    }
  }, [applicationScopeData])

  React.useEffect(() => {
    if (applicationScopeData && !isSetInitialValue) {
      setInitialValue(true)
    }
  }, [applicationScopeData, isSetInitialValue])

  React.useEffect(() => {
    if (selectedApplicationScope) {
      mutate({
        method: 'GET',
        path: `/product?applicationScopeId=${selectedApplicationScope?.id}&lang=${lang}`,
      })
    }
  }, [selectedApplicationScope])

  return (
    <Container>
      <div className="flex p-5 min-h-[50vh]">
        <ScrollArea className="flex-1 max-h-[50vh]">
          <ul>
            {applicationScopeData.map(
              (applicationScope: ApplicationScope, i) => (
                <Link
                  lang={lang}
                  key={i}
                  href={`/application-scope/${applicationScope?.translation?.slug}`}
                >
                  <li
                    className={cn(
                      'p-3 cursor-pointer hover:bg-gray-100 capitalize',
                      getActiveClass(applicationScope, 'top')
                    )}
                    onMouseOver={() =>
                      handleSelectedParentApplicationScope(applicationScope)
                    }
                  >
                    {applicationScope?.translation?.name}
                  </li>
                </Link>
              )
            )}
          </ul>
        </ScrollArea>
        <ScrollArea className="flex-[2] max-h-[50vh]">
          <div className="flex items-center gap-2 mb-5">
            <Typography as="h6" className="font-[600] pl-6 capitalize">
              {dict.common.products_text}
            </Typography>
            <ChevronRight size={15} />
          </div>
          <ul className="grid grid-cols-5 p-5">
            {(data as any)?.data?.map((product: Product, i: number) => (
              <Link
                lang={lang}
                key={i}
                href={`/product/${product.translation.slug}`}
              >
                <li className="flex flex-col items-center gap-2 justify-center p-3 cursor-pointer hover:bg-gray-200 capitalize">
                  <div>
                    <Image
                      className="rounded-full w-[50px] h-[50px]"
                      src={`${serverConfig.remoteUrl}/${product.featuredImage?.path}`}
                      alt={product.name}
                      width={50}
                      height={50}
                    />
                  </div>
                  <Typography className="text-sm text-center">
                    {product.name}
                  </Typography>
                </li>
              </Link>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </Container>
  )
}

function RightNavigation({ user }: { user: ActiveUser | null }) {
  const { dictionary: dict, lang } = useDictionary()
  const { logout } = useAuthenticatedUser()
  const router = useRouter()
  const { activeOrder } = useActiveOrder()
  const { setOpen } = useCart()

  const handleLogoutButton = async () => {
    const res = await logout()
    if (res?.success) {
      router.push('/login')
    }
  }

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              <Globe />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[300px]">
              <LanguageCurrencyPicker  />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent mr-1 text-sm uppercase font-semibold">
              {dict.navbar.about_us_text}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="p-4 min-w-[180px] capitalize">
                <ListItem href="/about" title={dict.navbar.about_us_text} />
                <ListItem href="/contact" title={dict.common.contact_us_text} />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {activeOrder?.lines && (activeOrder?.lines.length || 0) > 0 && (
            <NavigationMenuItem>
              <div className="relative">
                <Badge className="rounded-full absolute top-[-15px] left-[50%] translate-x-[-50%]">
                  <Typography className="p-0 m-0 text-xs">
                    {activeOrder?.lines?.length}
                  </Typography>
                </Badge>
                <Button onClick={() => setOpen(true)} variant="ghost">
                  <ShoppingCart />
                </Button>
              </div>
            </NavigationMenuItem>
          )}
          {user ? (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-primary text-black">
                    <User className="mr-2" />
                    <span className="text-sm pr-3 font-semibold uppercase">
                      {user?.name ? user?.name : user?.email}
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="p-4 min-w-[180px] uppercase">
                      <ListItem>
                        <Link href="/profile" lang={lang}>
                          {dict.common.profile_text}
                        </Link>
                      </ListItem>
                      <ListItem>
                        <span
                          aria-label="Logout button"
                          className="cursor-pointer"
                          onClick={handleLogoutButton}
                        >
                          {dict.navbar.logout_text}
                        </span>
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ) : (
            <>
              <NavigationMenuItem>
                <Button variant="ghost">
                  <Link href="/login" lang={lang}>
                    <span className="text-sm uppercase">
                      {dict.common.login_text}
                    </span>
                  </Link>
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button>
                  <PlusSquare className="mr-2" />
                  <Link
                    href="/partner-register"
                    lang={lang}
                    className="hover:text-white font-semibold"
                  >
                    <span className="text-sm pr-3 uppercase">
                      {dict.common.partner_with_us_text}
                    </span>
                  </Link>
                </Button>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  )
}
