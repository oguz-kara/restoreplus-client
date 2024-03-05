import MainLayout from '@/components/layouts/main-layout'
import DictionaryProvider from '@/context/use-dictionary'
import { getDictionary } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'
import React, { PropsWithChildren } from 'react'

export default async function Layout({
  children,
  params: { lang },
}: ParamsWithLang & PropsWithChildren) {
  const dictionary = await getDictionary(lang)

  return (
    <DictionaryProvider lang={lang} dictionary={dictionary}>
      <MainLayout lang={lang}>{children}</MainLayout>
    </DictionaryProvider>
  )
}
