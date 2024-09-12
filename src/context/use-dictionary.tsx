'use client'
import i18n from '@/i18n'
import { Dictionary, Locale } from '@/i18n/types'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

const DictionaryContext = createContext({
  lang: '' as Locale,
  dictionary: {} as Dictionary,
})

const DictionaryProvider = ({
  children,
  dictionary,
  lang,
}: { children: React.ReactNode } & {
  lang: Locale
  dictionary: Dictionary
}) => {
  const [currentLang, setCurrentLang] = useState<Locale>(lang)
  const [currentDictionary, setCurrentDictionary] =
    useState<Dictionary>(dictionary)

  const getDictionary = useCallback(async (lang: Locale) => {
    if (lang !== 'en' && lang !== 'tr') lang = 'en'
    const dictionary = await import(`@/i18n/dictionaries/${lang}.json`)
    return dictionary
  }, [])

  useEffect(() => {
    if (lang) setCurrentLang(lang)
    else setCurrentLang(i18n.defaultLocale as Locale)
  }, [lang])

  useEffect(() => {
    if (currentLang) {
      const fetchDictionary = async () => {
        const dict = await getDictionary(currentLang)
        setCurrentDictionary(dict as Dictionary)
      }

      fetchDictionary()
    }
  }, [currentLang, getDictionary])

  return (
    <DictionaryContext.Provider
      value={{ lang: currentLang, dictionary: currentDictionary }}
    >
      {children}
    </DictionaryContext.Provider>
  )
}

export const useDictionary = () => useContext(DictionaryContext)

export default DictionaryProvider
