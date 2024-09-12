import { AuthContextProvider } from '@/context/auth/auth-context'
import DictionaryProvider from '@/context/use-dictionary'
import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import React, { PropsWithChildren } from 'react'
import { TooltipProvider } from '../ui/tooltip'
import OfferProductsProvider from '@/context/use-offer-products'
import DictionaryV2Provider from '@/context/use-dictionary-v2'
import { sdk } from '@/restoreplus-sdk'

export default async function Providers({
  children,
  lang,
}: PropsWithChildren & PropsWithLang) {
  const dictionary = await getDictionary(lang)
  const dictionaryV2 = await sdk.dictionaries.getDictionary(lang, {
    isAdmin: true,
  })
  return (
    <TooltipProvider>
      <OfferProductsProvider>
        <DictionaryProvider lang={lang} dictionary={dictionary}>
          <DictionaryV2Provider lang={lang} dictionary={dictionaryV2}>
            <AuthContextProvider>{children}</AuthContextProvider>
          </DictionaryV2Provider>
        </DictionaryProvider>
      </OfferProductsProvider>
    </TooltipProvider>
  )
}
