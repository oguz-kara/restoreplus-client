import DictionaryProvider from '@/context/use-dictionary'
import DictionaryV2Provider from '@/context/use-dictionary-v2'
import OfferProductsProvider from '@/context/use-offer-products'
import { getDictionary } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'
import React, { PropsWithChildren } from 'react'

export default async function Layout({
  children,
  params: { lang },
}: PropsWithChildren & ParamsWithLang) {
  const dictionary = await getDictionary(lang)
  const dict = await sdk.dictionaries.getDictionary(lang, { isAdmin: true })

  return (
    <OfferProductsProvider>
      <DictionaryProvider lang={lang} dictionary={dictionary}>
        <DictionaryV2Provider lang={lang} dictionary={dict}>
          {children}
        </DictionaryV2Provider>
      </DictionaryProvider>
    </OfferProductsProvider>
  )
}
