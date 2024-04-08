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
import { useDictionary } from '@/context/use-dictionary'
import { Button } from '../ui/button'
import { ArrowRight, ChevronRight, Menu, User } from 'lucide-react'
import NavbarMobile from './navbar-mobile'
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import Container from './container'
import MegaMenu from './mega-menu'
import { useDisclosure } from '@/hooks/use-disclosure'
import Typography from './typography'
import useScrollPosition from '@/hooks/use-scroll-position'
import Image from '../ui/image'
import AdvancedSearchBox from './advanced-search-box'
import { usePathname } from 'next/navigation'

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
  const scrollPosition = useScrollPosition()
  const pathname = usePathname()
  const isOnProductPage = pathname.includes('/product')
  const whiteState =
    openCategories || scrollPosition > 0 || isOnProductPage || openSectors

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
      <Container
        className={cn(
          'pt-5 px-5',
          scrollPosition > 0 || isOnProductPage ? 'pb-5' : 'pb-0'
        )}
      >
        <div
          className={cn(scrollPosition > 0 || isOnProductPage ? '' : 'mb-5')}
        >
          <div className={cn('hidden lg:flex justify-between')}>
            <div className="flex-1">
              <Link lang={lang} href="/">
                <Logo
                  color={whiteState ? 'black' : 'white'}
                  width={120}
                  height={120}
                />
              </Link>
            </div>
            {/* search box */}
            {!pathname.includes('/product/finder') && (
              <div
                className={cn(
                  'hidden items-center flex-[2]',
                  scrollPosition > 0 || isOnProductPage ? 'flex' : 'hidden'
                )}
              >
                <AdvancedSearchBox />
              </div>
            )}
            <div className="flex justify-end flex-1">
              <RightNavigation />
            </div>
          </div>
          <NavbarMobile
            className="lg:hidden"
            categoryData={categoryData}
            lang={lang}
          />
        </div>
        <div
          className={cn(
            'flex gap-2',
            scrollPosition > 0 || isOnProductPage ? 'hidden' : 'flex'
          )}
        >
          <div>
            <MegaMenu
              open={openCategories}
              onClose={onCloseCategories}
              onOpen={onOpenCategories}
              trigger={
                <div className="flex items-center gap-2 cursor-pointer pb-5">
                  <Menu size={15} color={whiteState ? 'black' : 'white'} />
                  <Typography
                    className={whiteState ? 'text-black' : 'text-white'}
                  >
                    Kategoriler
                  </Typography>
                </div>
              }
              content={
                <ProductCategoryData
                  categoryData={categoryData?.data}
                  lang={lang}
                />
              }
              top={200}
            />
          </div>
          <div>
            <MegaMenu
              open={openSectors}
              onClose={onCloseSectors}
              onOpen={onOpenSectors}
              trigger={
                <div className="flex items-center gap-2 cursor-pointer pb-5">
                  <Menu size={15} color={whiteState ? 'black' : 'white'} />
                  <Typography
                    className={whiteState ? 'text-black' : 'text-white'}
                  >
                    Sektorler
                  </Typography>
                </div>
              }
              content={<SectorData sectorData={sectorData?.data} lang={lang} />}
              top={200}
            />
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
              <li
                key={i}
                className={cn(
                  'p-3 cursor-pointer hover:bg-gray-100 capitalize',
                  getActiveClass(category, 'top')
                )}
                onMouseOver={() => handleSelectedParentCategory(category)}
              >
                {category.name}
              </li>
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
              <li
                key={i}
                className="flex flex-col items-center gap-2 justify-center p-3 cursor-pointer hover:bg-gray-200 capitalize"
              >
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
  sectorData: TranslatedProductCategory[] | undefined
  lang: Locale
}) {
  const [selectedSector, setSelectedSector] = React.useState<any>(undefined)

  React.useEffect(() => {
    if (!selectedSector && sectorData && sectorData.length > 0)
      setSelectedSector(sectorData[0])
  }, [])

  return (
    <Container>
      <div className="flex gap-10 p-5 min-h-[50vh]">
        <ul className="flex-[2]">
          {sectorData?.map((sector, i) => (
            <Link
              href={`/sectors/${sector.id}/${sector.slug}`}
              key={i}
              lang={lang}
            >
              <li
                className={cn(
                  'hover:bg-gray-100 capitalize flex gap-5 justify-between text-lg p-3 border-b border-gray-300',
                  sector.id === selectedSector?.id ? 'bg-gray-100' : ''
                )}
                key={sector.id}
                onMouseOver={() => setSelectedSector(sector)}
                onMouseLeave={() => setSelectedSector(undefined)}
              >
                {sector.name}
                <ArrowRight color="gray" />
              </li>
            </Link>
          ))}
        </ul>
        <div className="flex-1">
          {selectedSector ? (
            <Image
              className="w-full h-full object-cover"
              src={`${serverConfig.remoteUrl}${selectedSector.featuredImage?.path}`}
              width={500}
              height={500}
              alt="test"
            />
          ) : null}
        </div>
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
