'use client'
import { useQuery } from '@/hooks/use-query'
import i18n from '@/i18n'
import { DictionaryType } from '@/i18n/dictionary-type'
import { Locale } from '@/i18n/types'
import React, { createContext, useContext, useEffect, useState } from 'react'

const DictionaryContext = createContext({
  lang: '' as Locale,
  dictionary: {} as DictionaryType,
  isPending: false,
})

const DictionaryV2Provider = ({
  children,
  lang,
  dictionary,
}: { children: React.ReactNode } & {
  lang: Locale
  dictionary: DictionaryType
}) => {
  const {
    data: queryDictionary,
    isPending,
    refetch,
  } = useQuery([`/dictionary?lang=${lang}`])
  const [currentDictionary, setCurrentDictionary] =
    useState<DictionaryType>(dictionary)
  const [currentLang, setCurrentLang] = useState<Locale>(lang)

  useEffect(() => {
    if (lang) setCurrentLang(lang)
    else setCurrentLang(i18n.defaultLocale as Locale)
  }, [lang])

  useEffect(() => {
    if (currentLang) refetch()
  }, [currentLang])

  useEffect(() => {
    setCurrentDictionary(dictionary)
  }, [queryDictionary])

  return (
    <DictionaryContext.Provider
      value={{
        lang: currentLang,
        dictionary: currentDictionary,
        isPending,
      }}
    >
      {children}
    </DictionaryContext.Provider>
  )
}

export const useDictionaryV2 = () => useContext(DictionaryContext)

export default DictionaryV2Provider
