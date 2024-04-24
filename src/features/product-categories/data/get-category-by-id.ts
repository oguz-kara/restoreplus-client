import { Locale } from '@/i18n/types'
import { serverFetcher } from '@/lib/server-fetcher'
import { consoleLog } from '@/utils/log-to-console'
import { getTranslation } from '@/utils/translations-utils'

export const getCategoryById = async (id: string, lang: Locale) => {
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

  console.log({ data })

  if (!data) return null

  const { translations, ...rest } = data

  return {
    ...rest,
    translation: getTranslation(lang, translations),
  } as ProductCategoryWithTranslation
}
