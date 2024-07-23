import { AuthContextProvider } from '@/context/auth/auth-context'
import DictionaryProvider from '@/context/use-dictionary'
import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import React, { PropsWithChildren } from 'react'
import { TooltipProvider } from '../ui/tooltip'
import OfferProductsProvider from '@/context/use-offer-products'

export default async function Providers({
  children,
  lang,
}: PropsWithChildren & PropsWithLang) {
  const dictionary = await getDictionary(lang)
  return (
    <TooltipProvider>
      <OfferProductsProvider>
        <DictionaryProvider lang={lang} dictionary={dictionary}>
          <AuthContextProvider>{children}</AuthContextProvider>
        </DictionaryProvider>
      </OfferProductsProvider>
    </TooltipProvider>
  )
}
