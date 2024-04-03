'use client'
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
import { User } from 'lucide-react'
import NavbarMobile from './navbar-mobile'
import { useAuthenticatedUser } from '@/context/auth/auth-context'

export function NavigationBar({
  categoryData,
  lang,
}: {
  categoryData: {
    data: BlogPostCategoryWithOneTranslation[]
    pagination: Pagination
  } | null
  lang: Locale
}) {
  return (
    <div>
      <div className="hidden lg:grid lg:grid-cols-3">
        <BlogCategoryNavigationData
          categoryData={categoryData?.data}
          lang={lang}
        />
        <div className="flex justify-center">
          <Link lang={lang} href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex justify-end">
          <RightNavigation />
        </div>
      </div>
      <NavbarMobile
        className="lg:hidden"
        categoryData={categoryData}
        lang={lang}
      />
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

function BlogCategoryNavigationData({
  categoryData,
  lang,
}: {
  categoryData: BlogPostCategoryWithOneTranslation[] | undefined
  lang: Locale
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {categoryData?.map((category, i) => (
          <NavigationMenuItem key={i}>
            <NavigationMenuTrigger className="bg-transparent text-white capitalize text-xs">
              {category.blogPostCategoryTranslation.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul
                className={`grid gap-3 p-4 md:w-[400px] lg:w-[700px] lg:grid-cols-[.75fr_1fr_1fr]`}
              >
                <li className={`row-span-3`}>
                  <NavigationMenuLink asChild>
                    <Link
                      lang={lang as Locale}
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        {category.blogPostCategoryTranslation.name}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        {
                          category.subCategories[0].blogPostCategoryTranslation
                            .description
                        }
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {category.subCategories.map((subCategory, i) => (
                  <ListItem
                    key={i}
                    href={`/categories/${subCategory.id}/${subCategory.blogPostCategoryTranslation.slug}`}
                    title={subCategory.blogPostCategoryTranslation.name}
                  >
                    {subCategory.blogPostCategoryTranslation.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
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
              <NavigationMenuTrigger
                key={i}
                className="bg-transparent text-white"
              >
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
              {item.href === '/register' ? (
                <Button>
                  <User className="mr-2" />
                  <Link href={item.href} lang={lang}>
                    <span className="text-sm pr-3">{item.title}</span>
                  </Link>
                </Button>
              ) : (
                <Link href={item.href} lang={lang}>
                  <span className="text-sm text-white pr-3">{item.title}</span>
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
