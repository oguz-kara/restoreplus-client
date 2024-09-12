import { AuthContextProvider } from '@/context/auth/auth-context'
import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import React, { PropsWithChildren } from 'react'
import { TooltipProvider } from '../ui/tooltip'
import OfferProductsProvider from '@/context/use-offer-products'
import DictionaryProvider from '@/context/use-dictionary-v2'
import { sdk } from '@/restoreplus-sdk'

export default async function Providers({
  children,
  lang,
}: PropsWithChildren & PropsWithLang) {
  const dictionaryV2 = await sdk.dictionaries.getDictionary(lang, {
    isAdmin: true,
  })
  return (
    <TooltipProvider>
      <OfferProductsProvider>
        <DictionaryProvider lang={lang} dictionary={dictionaryV2}>
          <AuthContextProvider>{children}</AuthContextProvider>
        </DictionaryProvider>
      </OfferProductsProvider>
    </TooltipProvider>
  )
}
