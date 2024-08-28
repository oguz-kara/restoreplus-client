import { PropsWithLang } from '@/i18n/types'
import React, { PropsWithChildren } from 'react'
import { NavigationBar } from '../common/navbar'
import Footer from './footer'
import CartDrawer from '@/features/active-order/components/cart-drawer'
import { sdk } from '@/restoreplus-sdk'
import { categoryTreeQuery } from '@/features/product-categories/queries/category-tree-query'
import { getWithApplicationScopesQuery } from '@/features/sectors/queries/get-with-application-scopes.query'
import { getServerSideActiveUser } from '@/utils/get-server-side-active-user'

export default async function MainLayout({
  lang,
  children,
}: PropsWithLang & PropsWithChildren) {
  const categoryData = await sdk.productCategories.getAllByQuery(
    categoryTreeQuery,
    { lang, isAdmin: true, page: '1', take: '100' }
  )
  const sectorData = await sdk.sectors.getAllByQuery(
    getWithApplicationScopesQuery,
    { lang, isAdmin: true }
  )

  const user = await getServerSideActiveUser()

  return (
    <div className="grid pt-[42px]">
      <CartDrawer lang={lang} />
      <header>
        <NavigationBar
          lang={lang}
          categoryData={categoryData}
          sectorData={sectorData}
          activeUser={user}
        />
      </header>
      <main className="min-h-screen mt-9">{children}</main>
      <Footer lang={lang} />
      {/* <CookieConsentBanner /> */}
    </div>
  )
}
