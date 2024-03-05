import { PropsWithLang } from '@/i18n/types'
import React, { PropsWithChildren } from 'react'
import { NavigationBar } from '../common/navbar'
import Footer from './footer'
import { getCategoriesWithSubCategories } from '@/features/categories/data/get-categories-with-sub-categories'
import Container from '../common/container'

export default async function MainLayout({
  lang,
  children,
}: PropsWithLang & PropsWithChildren) {
  const result = await getCategoriesWithSubCategories('tr')

  return (
    <div className="grid">
      <header className="bg-foreground">
        <Container className="p-5">
          <NavigationBar lang={lang} categoryData={result} />
        </Container>
      </header>
      <main className="min-h-screen">{children}</main>
      <Footer lang={lang} categoryData={result} />
    </div>
  )
}
