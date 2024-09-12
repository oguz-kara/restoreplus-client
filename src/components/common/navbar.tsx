'use client'
import { motion } from 'framer-motion'
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
  ArrowRight,
  ChevronDown,
  ChevronRight,
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
import PickLocaleAndCurrencyMenu from '@/features/locale/components/pick-locale-and-currency-menu'
import Typography from '../ui/typography'
import { Badge } from '../ui/badge'
import { useQuery } from '@/hooks/use-query'
import { useActiveOrder } from '@/features/active-order/context/use-active-order'
import { useCart } from '@/features/active-order/context/use-cart-view'
import { useDictionary } from '@/context/use-dictionary-v2'

export function NavigationBar({
  categoryData,
  sectorData,
  lang,
  activeUser,
}: {
  categoryData: {
    data: any
    pagination: Pagination
  } | null
  sectorData: {
    data: any
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
          : 'bg-foreground text-white border-b border-foreground'
      )}
      style={{
        zIndex: 50,
      }}
    >
      <Container className={cn('px-5 py-0')}>
        <div>
          <div className={cn('hidden lg:flex justify-between')}>
            <div className={cn('flex flex-1 gap-4')}>
              <div className="flex items-center">
                <Link href="/product/finder" lang={lang}>
                  <Typography
                    className={cn(
                      whiteState ? 'text-black' : 'text-white',
                      'text-sm'
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
                          'text-sm',
                          'leading-0 mr-1'
                        )}
                      >
                        {dict.navbar.products_by_category_text}
                      </Typography>
                      <ChevronDown
                        color={
                          openCategories || openSectors || scrollPosition > 0
                            ? 'black'
                            : 'white'
                        }
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
                      categoryData={categoryData?.data}
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
                          'text-sm',
                          'leading-0 mr-1'
                        )}
                      >
                        {dict.navbar.products_by_sector_text}
                      </Typography>
                      <ChevronDown
                        color={
                          openSectors || openCategories || scrollPosition > 0
                            ? 'black'
                            : 'white'
                        }
                        className={cn(
                          openSectors ? 'rotate-180' : '',
                          'transition-all ease-in-out'
                        )}
                        size="15px"
                      />
                    </div>
                  }
                  content={
                    <SectorData sectorData={sectorData?.data} lang={lang} />
                  }
                  top={navbarHeight}
                />
              </div>
            </div>
            <div className="flex-1 flex justify-center py-5">
              <Link lang={lang} href="/">
                <Logo
                  color={whiteState ? 'black' : 'white'}
                  width={120}
                  height={120}
                />
              </Link>
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
  const [selectedSubCategory, setSelectedSubCategory] =
    React.useState<ProductCategory | null>(null)
  const [selectedParentCategory, setSelectedParentCategory] =
    React.useState<ProductCategory | null>(null)
  const [subCategories, setSubCategories] = React.useState<ProductCategory[]>(
    []
  )
  const [parentCategories, setParentCategories] = React.useState<
    ProductCategory[]
  >([])

  const { refetch, data } = useQuery([
    `/product?categoryId=${selectedSubCategory?.id}`,
  ])

  const handleSelectedParentCategory = (category: any) => {
    setSelectedParentCategory(category)
    if (category.subCategories && category.subCategories.length > 0) {
      setSubCategories(category.subCategories)
      const subCategory = category.subCategories[0]
      setSelectedSubCategory(subCategory)
    } else {
      setSubCategories([])
      setSelectedSubCategory(null)
    }
  }

  const getActiveClass = (category: any, type: 'sub' | 'top' | 'bottom') => {
    if (
      type === 'sub' &&
      selectedSubCategory &&
      Object.keys(selectedSubCategory)?.length > 0
    ) {
      // @ts-ignore
      return category.id === selectedSubCategory?.id ? 'bg-gray-100' : ''
    } else if (
      type === 'top' &&
      selectedParentCategory &&
      Object.keys(selectedParentCategory)?.length > 0
    ) {
      // @ts-ignore
      return category.id === selectedParentCategory?.id ? 'bg-gray-100' : ''
    }

    return ''
  }

  React.useEffect(() => {
    if (parentCategories && parentCategories.length > 0) {
      handleSelectedParentCategory(parentCategories[0])
    }
  }, [parentCategories])

  React.useEffect(() => {
    if (categoryData && !isSetInitialValue) {
      setInitialValue(true)
      setParentCategories(
        categoryData.filter(({ parentCategory }) => !parentCategory)
      )
    }
  }, [categoryData, isSetInitialValue])

  React.useEffect(() => {
    refetch()
  }, [selectedSubCategory, refetch])

  return (
    <Container>
      <div className="flex p-5 min-h-[50vh]">
        <div className="flex-1">
          <ul>
            {parentCategories
              .filter(({ parentCategory }) => !parentCategory)
              .map((category: ProductCategory, i) => (
                <Link
                  lang={lang}
                  key={i}
                  href={`/product/categories/${category.id}/${category?.translation?.slug}`}
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
        </div>
        <div className="flex-1 border-r border-l border-gray-300">
          <ul>
            {subCategories.map((category: ProductCategory, i) => (
              <li
                key={i}
                className={cn(
                  'p-3 cursor-pointer hover:bg-gray-100 capitalize',
                  getActiveClass(category, 'sub')
                )}
                onMouseOver={() => setSelectedSubCategory(category)}
              >
                {category?.translation?.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-[2]">
          <div className="flex items-center gap-2 mb-5">
            <Typography as="h6" className="font-[600] pl-6 capitalize">
              {dict.common.products_text}
            </Typography>
            <ChevronRight size={15} />
          </div>
          <ul className="grid grid-cols-4 p-5">
            {(data as any)?.data?.map((product: Product, i: number) => (
              <Link
                lang={lang}
                key={i}
                href={`/product/${product.id}/${product.translation.slug}`}
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
        </div>
      </div>
    </Container>
  )
}

function SectorData({
  sectorData,
  lang,
}: {
  sectorData: Sector[] | undefined
  lang: Locale
}) {
  const { dictionary: dict } = useDictionary()
  const [selectedSector, setSelectedSector] = React.useState<
    Sector | undefined
  >(undefined)
  const [hoveredApplicationScope, setHoveredApplicationScope] = React.useState<
    ApplicationScope | undefined
  >(undefined)

  React.useEffect(() => {
    if (!selectedSector && sectorData && sectorData.length > 0)
      setSelectedSector(sectorData[0])
  }, [])

  return (
    <Container>
      <div className="flex gap-10 p-5 min-h-[50vh]">
        <div className="flex-1 h-[max-content]">
          <div className="p-3 rounded-sm mb-3">
            <Typography as="h6" className="uppercase">
              {dict.navbar.products_by_sector_text}
            </Typography>
          </div>
          <ul>
            {sectorData?.map((sector, i) => (
              <div key={i}>
                <Link
                  href={`/sectors/${sector.id}/${sector.translation.slug}`}
                  lang={lang}
                >
                  <li
                    className={cn(
                      'hover:bg-gray-100 uppercase flex gap-5 justify-between text-lg p-3 border-b border-gray-300',
                      sector.id === selectedSector?.id ? 'bg-gray-100' : ''
                    )}
                    key={sector.id}
                    onMouseOver={() => setSelectedSector(sector)}
                  >
                    <Typography as="p">{sector.translation.name}</Typography>
                    <motion.div
                      key={sector.id}
                      variants={{
                        open: { rotateX: '-10px', x: 0 },
                        closed: { rotateX: 90, x: 0 },
                      }}
                      animate={
                        selectedSector?.id === sector.id ? 'open' : 'closed'
                      }
                      initial={'closed'}
                    >
                      <ArrowRight />
                    </motion.div>
                  </li>
                </Link>
              </div>
            ))}
          </ul>
        </div>
        {selectedSector?.applicationScopes &&
        selectedSector?.applicationScopes?.length > 0 ? (
          <div className="flex-1">
            <div className="p-3 rounded-sm mb-3">
              <Typography as="h6" className="uppercase">
                {dict.navbar.application_scopes_text}
              </Typography>
            </div>
            <motion.div
              key={selectedSector?.id}
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: '20px' },
              }}
              animate={'open'}
              initial={'closed'}
            >
              <div>
                {selectedSector?.applicationScopes?.map((scope, i) => (
                  <Link
                    key={scope.id}
                    lang={lang}
                    href={`/sectors/${selectedSector.id}/${selectedSector.translation.slug}/applications/${scope.id}/${scope.translation.slug}`}
                  >
                    <div
                      className="hover:bg-gray-100 uppercase flex gap-5 justify-between text-lg p-3 border-b border-gray-300 px-3"
                      key={i}
                      onMouseOver={() => setHoveredApplicationScope(scope)}
                      onMouseLeave={() => setHoveredApplicationScope(undefined)}
                    >
                      <Typography as="p">{scope.translation.name}</Typography>
                      <motion.div
                        key={scope.id}
                        variants={{
                          open: { rotateX: 0, x: 0 },
                          closed: { rotateX: 90, x: 0 },
                        }}
                        animate={
                          hoveredApplicationScope?.id === scope.id
                            ? 'open'
                            : 'closed'
                        }
                        initial={'closed'}
                      >
                        <ArrowRight />
                      </motion.div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="flex-1">
            <Typography as="h6">No data</Typography>
          </div>
        )}
      </div>
    </Container>
  )
}

function RightNavigation({ user }: { user: ActiveUser | null }) {
  const { dictionary: dict, lang } = useDictionary()
  const { loading, logout } = useAuthenticatedUser()
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
            <PickLocaleAndCurrencyMenu />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent capitalize mr-1">
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
                    <span className="text-sm pr-3 font-semibold">
                      {user?.name ? user?.name : user?.email}
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="p-4 min-w-[180px]">
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
                    <span className="text-sm">{dict.common.login_text}</span>
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
                    <span className="text-sm pr-3">
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
