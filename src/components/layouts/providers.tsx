import { AuthContextProvider } from '@/context/auth/AuthContext'
import DictionaryProvider from '@/context/use-dictionary'
import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import React, { PropsWithChildren } from 'react'

export default async function Providers({
  children,
  lang,
}: PropsWithChildren & PropsWithLang) {
  const dictionary = await getDictionary(lang)
  return (
    <DictionaryProvider lang={lang} dictionary={dictionary}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </DictionaryProvider>
  )
}
