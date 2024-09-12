import 'server-only'
import { Locale } from './types'
import { sdk } from '@/restoreplus-sdk'
import { DictionaryType } from './dictionary-type'

export const getDictionary: (
  locale: Locale
) => Promise<DictionaryType> = async (locale: Locale) => {
  return await sdk.dictionaries.getDictionary(locale, {
    isAdmin: true,
  })
}
