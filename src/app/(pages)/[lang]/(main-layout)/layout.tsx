import MainLayout from '@/components/layouts/main-layout'
import Providers from '@/components/layouts/providers'
import { ParamsWithLang } from '@/i18n/types'
import React, { PropsWithChildren } from 'react'

export default async function Layout({
  children,
  params: { lang },
}: ParamsWithLang & PropsWithChildren) {
  return (
    <Providers lang={lang}>
      <MainLayout lang={lang}>{children}</MainLayout>
    </Providers>
  )
}
