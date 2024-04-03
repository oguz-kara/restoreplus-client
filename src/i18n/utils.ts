import i18n from '.'
import { Locale } from './types'

export const getProperLanguage = (lang: Locale | undefined) => {
  const result = i18n.locales.find((locale) => locale === lang)

  if (!result) return i18n.defaultLocale
  return result
}
