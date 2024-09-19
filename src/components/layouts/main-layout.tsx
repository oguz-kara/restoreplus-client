import { PropsWithLang } from '@/i18n/types'
import React, { PropsWithChildren } from 'react'
import { NavigationBar } from '../common/navbar'
import Footer from './footer'
import CartDrawer from '@/features/active-order/components/cart-drawer'
import { sdk } from '@/restoreplus-sdk'
import { categoryTreeQuery } from '@/features/product-categories/queries/category-tree-query'
import { getServerSideActiveUser } from '@/utils/get-server-side-active-user'

export default async function MainLayout({
  lang,
  children,
}: PropsWithLang & PropsWithChildren) {
  const categoryData = await sdk.productCategories.getAllByQuery(
    categoryTreeQuery,
    { lang, isAdmin: true, take: 'all' }
  )

  const applicationScopeData = await sdk.applicationScopes.getAllByQuery(
    {},
    { lang, isAdmin: true, take: 'all' }
  )

  const localesData = await sdk.supportedLocales.getAllByQuery(
    { orderBy: [{ name: 'asc' }], take: 'all' },
    { lang }
  )

  const currencyData = await sdk.currencies.getAllByQuery(
    { take: 'all' },
    { lang }
  )

  const user = await getServerSideActiveUser()

  return (
    <div className="grid pt-[42px]">
      <CartDrawer lang={lang} />
      <header>
        <NavigationBar
          lang={lang}
          categoryData={categoryData}
          applicationScopeData={applicationScopeData}
          currenciesData={currencyData}
          localesData={localesData}
          activeUser={user}
        />
      </header>
      <main className="min-h-screen mt-9">{children}</main>
      <Footer lang={lang} />
      {/* <CookieConsentBanner /> */}
    </div>
  )
}
