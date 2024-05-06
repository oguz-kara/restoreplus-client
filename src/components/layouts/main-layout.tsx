import { Locale, PropsWithLang } from '@/i18n/types'
import React, { PropsWithChildren } from 'react'
import { NavigationBar } from '../common/navbar'
import { serverFetcher } from '@/lib/server-fetcher'
import { getProductCategoryData } from '@/features/product/data/get-product-category-data'
import Footer from './footer'
import { getTranslationOfList } from '@/utils/translations-utils'
import CartDrawer from '@/features/active-order/components/cart-drawer'
import CookieConsentBanner from '../common/cookie-consent-banner'

export default async function MainLayout({
  lang,
  children,
}: PropsWithLang & PropsWithChildren) {
  const categoryData = await getProductCategoryData({ lang: 'tr' })
  const sectorData = await getSectorData({ lang: 'tr' })

  return (
    <div className="grid pt-[42px]">
      <CartDrawer lang={lang} />
      <header>
        <NavigationBar
          lang={lang}
          categoryData={categoryData}
          sectorData={sectorData}
        />
      </header>
      <main className="min-h-screen mt-9">{children}</main>
      <Footer lang={lang} />
      {/* <CookieConsentBanner /> */}
    </div>
  )
}

async function getSectorData({ lang }: { lang: string }) {
  const { data } = await serverFetcher(
    '/sectors/all?include.translations.include.locale=true&include.featuredImage=true&include.applicationScopes.include.translations.include.locale=true'
  )

  if (data.message) return data

  const { data: sectorsData, pagination } = data

  return {
    data: getTranslationOfList<SectorWithTranslation>(
      lang as Locale,
      sectorsData
    )
      .filter(({ applicationScopes }) => Boolean(applicationScopes))
      .map(({ applicationScopes, ...rest }) => {
        return {
          ...rest,
          applicationScopes: getTranslationOfList(
            lang as Locale,
            applicationScopes as any
          ),
        }
      }),
    pagination,
  } as {
    data: SectorWithTranslation[]
    pagination: Pagination
  }
}
