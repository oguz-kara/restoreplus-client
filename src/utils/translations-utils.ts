import { Locale } from '@/i18n/types'

export const getTranslation = <T>(
  locale: Locale,
  translations: { locale: { locale: Locale } }[] | undefined | null
) => {
  if (!translations) return []
  return translations.find(
    (translation) => translation.locale.locale === locale
  ) as T | undefined
}

export const getTranslationOfList = <T>(
  locale: Locale,
  list: { translations: { locale: { locale: Locale } }[] }[]
) => {
  return list
    .filter((item) =>
      item.translations.find(
        (translation) => translation.locale.locale === locale
      )
    )
    .map((item) => {
      const { translations, ...rest } = item
      const translation = translations.find(
        (translation) => translation.locale.locale === locale
      )

      return {
        ...rest,
        translation,
      }
    }) as T[]
}
