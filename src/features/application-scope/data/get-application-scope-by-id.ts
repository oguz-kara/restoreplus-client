import { Locale } from '@/i18n/types'
import { serverFetcher } from '@/lib/server-fetcher'
import {
  getTranslation,
  getTranslationOfList,
} from '@/utils/translations-utils'

export async function getApplicationScopeById(
  id: string,
  locale: string = 'tr'
) {
  const query = {
    include: {
      translations: {
        include: {
          locale: true,
        },
      },
      featuredImage: true,
    },
  }

  const { data } = await serverFetcher(`/application-scopes/single/${id}`, {
    body: JSON.stringify(query),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!data) return null

  return {
    ...data,
    translation: getTranslation(
      locale as Locale,
      data.translations
    ) as ApplicationScopeTranslation,
  } as ApplicationScope
}
