import DictionaryProvider from '@/context/use-dictionary-v2'
import OfferProductsProvider from '@/context/use-offer-products'
import { ParamsWithLang } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'
import React, { PropsWithChildren } from 'react'

export default async function Layout({
  children,
  params: { lang },
}: PropsWithChildren & ParamsWithLang) {
  const dict = await sdk.dictionaries.getDictionary(lang, { isAdmin: true })

  return (
    <OfferProductsProvider>
      <DictionaryProvider lang={lang} dictionary={dict}>
        {children}
      </DictionaryProvider>
    </OfferProductsProvider>
  )
}
