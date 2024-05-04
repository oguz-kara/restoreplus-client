import { Locale } from '@/i18n/types'
import { serverFetcher } from '@/lib/server-fetcher'
import {
  getTranslation,
  getTranslationOfList,
} from '@/utils/translations-utils'

export const getCategoryById = async (id: string | number, lang: Locale) => {
  const { data } = await serverFetcher(
    `/products/categories/single/${id}?lang=${lang}`,
    {
      method: 'POST',
      body: JSON.stringify({
        include: {
          translations: {
            include: {
              locale: true,
            },
          },
          featuredImage: true,
        },
      }),
    }
  )

  if (!data) return null

  const { translations, ...rest } = data

  return {
    ...rest,
    translation: getTranslation(lang, translations),
    subCategories: getTranslationOfList(lang, rest.subCategories),
  } as ProductCategoryWithTranslation
}

