import { Locale } from '@/i18n/types'
import { clientFetcher } from '@/lib/client-fetcher'
import {
  getTranslation,
  getTranslationOfList,
} from '@/utils/translations-utils'

export const getCategoryByIdClient = async (
  id: string | number,
  lang: Locale
) => {
  const { data } = await clientFetcher(
    `/product/categories?id=${id}&lang=${lang}`
  )

  if (!data) return null

  const { translations, ...rest } = data

  return {
    ...rest,
    translation: getTranslation(lang, translations),
    subCategories: getTranslationOfList(lang, rest.subCategories),
  } as ProductCategoryWithTranslation
}
