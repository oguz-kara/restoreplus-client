import DictionaryProvider from '@/context/use-dictionary'
import OfferProductsProvider from '@/context/use-offer-products'
import { getDictionary } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'
import React, { PropsWithChildren } from 'react'

export default async function Layout({
  children,
  params: { lang },
}: PropsWithChildren & ParamsWithLang) {
  const dictionary = await getDictionary(lang)

  return (
    <OfferProductsProvider>
      <DictionaryProvider lang={lang} dictionary={dictionary}>
        {children}
      </DictionaryProvider>
    </OfferProductsProvider>
  )
}
