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
import { useDictionary } from '@/context/use-dictionary'
import { Button } from '../ui/button'
import { ArrowRight, ChevronRight, User } from 'lucide-react'
import NavbarMobile from './navbar-mobile'
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import Container from './container'
import MegaMenu from './mega-menu'
import { useDisclosure } from '@/hooks/use-disclosure'
import useScrollPosition from '@/hooks/use-scroll-position'
import Image from '../ui/image'
import { usePathname } from 'next/navigation'
import PickLocaleAndCurrencyMenu from '@/features/locale/components/pick-locale-and-currency-menu'
import Typography from '../ui/typography'

export function NavigationBar({
  categoryData,
  sectorData,
  lang,
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
}) {
  const {
    dictionary: { common },
  } = useDictionary()
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
        whiteState ? 'bg-white text-black' : 'bg-foreground text-white'
      )}
      style={{
        zIndex: 50,
        boxShadow:
          'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
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
                    {common.productFinder}
                  </Typography>
                </Link>
              </div>
              <div className="h-full">
                <MegaMenu
                  open={openCategories}
                  onClose={onCloseCategories}
                  onOpen={onOpenCategories}
                  trigger={
                    <div className="cursor-pointer h-full flex items-center ">
                      <Typography
                        className={cn(
                          whiteState ? 'text-black' : 'text-white',
                          'text-sm'
                        )}
                      >
                        {common.categories}
                      </Typography>
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
                    <div className="cursor-pointer h-full flex items-center ">
                      <Typography
                        className={cn(
                          whiteState ? 'text-black' : 'text-white',
                          'text-sm'
                        )}
                      >
                        {common.sectors}
                      </Typography>
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
              <RightNavigation />
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
  categoryData: TranslatedProductCategory[] | undefined
  lang: Locale
}) {
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<
    TranslatedProductCategory | ProductCategory | {}
  >({})
  const [selectedParentCategory, setSelectedParentCategory] = React.useState<
    TranslatedProductCategory | ProductCategory | {}
  >({})
  const [subCategories, setSubCategories] = React.useState<
    TranslatedProductCategory[] | ProductCategory[]
  >([])
  const [bottomCategories, setBottomCategories] = React.useState<
    TranslatedProductCategory[] | ProductCategory[]
  >([])
  const [parentCategories, setParentCategories] = React.useState<
    TranslatedProductCategory[]
  >([])

  const handleSelectedParentCategory = (category: any) => {
    setSelectedParentCategory(category)
    if (category.subCategories && category.subCategories.length > 0) {
      setSubCategories(category.subCategories)
      const subCategory = category.subCategories[0]
      setSelectedSubCategory(subCategory)
      if (subCategory?.subCategories) {
        setBottomCategories(subCategory.subCategories)
      } else {
        setBottomCategories([])
      }
    } else {
      setSubCategories([])
      setSelectedSubCategory({})
      setBottomCategories([])
    }
  }

  const handleSelectedSubCategory = (category: any) => {
    setBottomCategories(category.subCategories)
    setSelectedSubCategory(category)
  }

  const getActiveClass = (category: any, type: 'sub' | 'top' | 'bottom') => {
    if (
      type === 'sub' &&
      selectedSubCategory &&
      Object.keys(selectedSubCategory).length > 0
    ) {
      // @ts-ignore
      return category.id === selectedSubCategory.id ? 'bg-gray-100' : ''
    } else if (
      type === 'top' &&
      selectedParentCategory &&
      Object.keys(selectedParentCategory).length > 0
    ) {
      // @ts-ignore
      return category.id === selectedParentCategory.id ? 'bg-gray-100' : ''
    }

    return ''
  }

  React.useEffect(() => {
    if (parentCategories && parentCategories.length > 0) {
      handleSelectedParentCategory(parentCategories[0])
    }
  }, [parentCategories])

  React.useEffect(() => {
    if (categoryData) {
      setParentCategories(categoryData.slice(0, 7))
    }
  }, [categoryData])

  return (
    <Container>
      <div className="flex p-5 min-h-[50vh]">
        <div className="flex-1">
          <ul>
            {parentCategories.map((category: TranslatedProductCategory, i) => (
              <Link
                lang={lang}
                key={i}
                href={`/product/categories/${category.id}/${category.slug}`}
              >
                <li
                  className={cn(
                    'p-3 cursor-pointer hover:bg-gray-100 capitalize',
                    getActiveClass(category, 'top')
                  )}
                  onMouseOver={() => handleSelectedParentCategory(category)}
                >
                  {category.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex-1 border-r border-l border-gray-300">
          <ul>
            {subCategories?.map((category: any, i) => (
              <li
                key={i}
                className={cn(
                  'p-3 cursor-pointer hover:bg-gray-100 capitalize',
                  getActiveClass(category, 'sub')
                )}
                onMouseOver={() => handleSelectedSubCategory(category)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-[2]">
          <div className="flex items-center gap-2 mb-5">
            <Typography as="h6" className="font-[600] pl-6 capitalize">
              {/* @ts-ignore */}
              {selectedSubCategory.name}
            </Typography>
            <ChevronRight size={15} />
          </div>
          <ul className="grid grid-cols-4 ">
            {bottomCategories?.map((category: any, i) => (
              <Link
                lang={lang}
                key={i}
                href={`/product/categories/${category.id}/${category.slug}`}
              >
                <li className="flex flex-col items-center gap-2 justify-center p-3 cursor-pointer hover:bg-gray-200 capitalize">
                  <div>
                    <Image
                      className="rounded-full w-[50px] h-[50px]"
                      src={`${serverConfig.remoteUrl}/${category.featuredImage?.path}`}
                      alt={category.name}
                      width={50}
                      height={50}
                    />
                  </div>
                  <Typography className="text-sm text-center">
                    {category.name}
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
  sectorData: SectorWithTranslation[] | undefined
  lang: Locale
}) {
  const {
    dictionary: {
      common,
      applicationScope: { title },
    },
  } = useDictionary()
  const [selectedSector, setSelectedSector] = React.useState<
    SectorWithTranslation | undefined
  >(undefined)
  const [hoveredApplicationScope, setHoveredApplicationScope] = React.useState<
    ApplicationScopeWithTranslation | undefined
  >(undefined)

  React.useEffect(() => {
    if (!selectedSector && sectorData && sectorData.length > 0)
      setSelectedSector(sectorData[0])
  }, [])

  return (
    <Container>
      <div className="flex gap-10 p-5 min-h-[50vh]">
        <div className="flex-1 h-[max-content]">
          <div className="p-3 bg-primary rounded-sm mb-3">
            <Typography as="h6" className="uppercase">
              {common.sectors}
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
            <div className="p-3 bg-primary rounded-sm mb-3">
              <Typography as="h6" className="uppercase">
                {title}
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
                  <Link key={scope.id} lang={lang} href={`/`}>
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

function RightNavigation() {
  const { user } = useAuthenticatedUser()
  const { dictionary, lang } = useDictionary()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <PickLocaleAndCurrencyMenu />
        </NavigationMenuItem>
        {dictionary.layout.navigation.navItems?.map((item, i) =>
          !item.href ? (
            <NavigationMenuItem key={i}>
              <NavigationMenuTrigger key={i} className="bg-transparent">
                {item.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="p-4 min-w-[180px]">
                  {!item.href ? (
                    item?.navLinks?.map((item, i) => (
                      <ListItem key={i} href={item.href} title={item.title} />
                    ))
                  ) : (
                    <div key={i}>
                      <Link href="/docs" lang={lang}></Link>{' '}
                    </div>
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : !user ? (
            <NavigationMenuItem key={i}>
              {item.href.includes('/register') ? (
                <Button>
                  <User className="mr-2" />
                  <Link href={item.href} lang={lang}>
                    <span className="text-sm pr-3">{item.title}</span>
                  </Link>
                </Button>
              ) : (
                <Link href={item.href} lang={lang}>
                  <span className="text-sm pr-3">{item.title}</span>
                </Link>
              )}
            </NavigationMenuItem>
          ) : null
        )}
        {user && (
          <NavigationMenuItem>
            <Button>
              <User className="mr-2" />
              <Link href="/profile" lang={lang}>
                <span className="text-sm pr-3">
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.firstName
                    ? user.firstName
                    : 'User'}
                </span>
              </Link>
            </Button>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
