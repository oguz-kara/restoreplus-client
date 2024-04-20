import { Locale } from '@/i18n/types'
import { getProperLanguage } from '@/i18n/utils'

export const convertToSearch = (
  searchBy: string[],
  term: string,
  translation?: {
    searchByTranslation?: string[] | string
    locale?: string
  }
) => {
  const properLang = getProperLanguage(translation?.locale as Locale)
  let result: any = {}
  searchBy.forEach((item) => {
    result[item] = term
  })
  if (
    translation?.searchByTranslation &&
    Array.isArray(translation.searchByTranslation) &&
    translation.searchByTranslation.length > 0
  ) {
    const translationSearchObjects = translation.searchByTranslation.map(
      (item) => {
        return {
          translations: {
            some: {
              locale: {
                locale: properLang,
              },
              [item]: {
                contains: term,
                mode: 'insensitive',
              },
            },
          },
        }
      }
    )
    result.translations = translationSearchObjects
  } else if (translation?.searchByTranslation) {
    result.translations = [
      {
        translations: {
          some: {
            locale: {
              locale: properLang,
            },
            [translation.searchByTranslation as string]: {
              contains: term,
              mode: 'insensitive',
            },
          },
        },
      },
    ]
  }

  return { search: result }
}
