import 'server-only'
import { Dictionary, Locale } from './types'
import { sdk } from '@/restoreplus-sdk'
import { DictionaryType } from './dictionary-type'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  tr: () => import('./dictionaries/tr.json').then((module) => module.default),
}

// @ts-ignore
export const getDictionary: (locale: Locale) => Promise<Dictionary> = async (
  locale: Locale
) => {
  if (locale !== 'en' && locale !== 'tr') return dictionaries['en']()

  // @ts-ignore
  return dictionaries[locale]()
}

export const getDictionaryV2: (
  locale: Locale
) => Promise<DictionaryType> = async (locale: Locale) => {
  return await sdk.dictionaries.getDictionary(locale, {
    isAdmin: true,
  })
}
