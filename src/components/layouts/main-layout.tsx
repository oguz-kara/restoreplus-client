import {  PropsWithLang } from '@/i18n/types'
import React, { PropsWithChildren } from 'react'
import { NavigationBar } from '../common/navbar'
import { serverFetcher } from '@/lib/server-fetcher'
import { getProductCategoryData } from '@/features/product/data/get-product-category-data'
import Footer from './footer'

export default async function MainLayout({
  lang,
  children,
}: PropsWithLang & PropsWithChildren) {
  const categoryData = await getProductCategoryData({ lang: 'tr' })
  const sectorData = await getSectorData({ lang: 'tr' })

  return (
    <div className="grid pt-[42px]">
      <header>
        <NavigationBar
          lang={lang}
          categoryData={categoryData}
          sectorData={sectorData}
        />
      </header>
      <main className="min-h-screen mt-9">{children}</main>
      <Footer lang={lang} />
    </div>
  )
}

async function getSectorData({ lang }: { lang: string }) {
  const { data } = await serverFetcher(
    '/sectors/all?include.translations.include.locale=true&include.featuredImage=true'
  )

  const { data: sectorsData, pagination } = data

  return {
    data: sectorsData.map((sector: Sector) => {
      const { translations, ...restSectors } = sector
      const translation = translations.find(
        (translation) => translation.locale.locale === lang
      )

      if (!translation) throw new Error('translation not found!')

      const { locale, ...restTranslation } = translation

      return {
        ...restTranslation,
        ...restSectors,
      }
    }),
    pagination,
  }
}
