import { Locale } from '@/i18n/types'
import { serverFetcher } from '@/lib/server-fetcher'
import {
  getTranslation,
  getTranslationOfList,
} from '@/utils/translations-utils'

export async function getSectorById(id: string, locale: string = 'tr') {
  const query = {
    include: {
      featuredImage: true,
      translations: {
        include: {
          locale: true,
        },
      },
      applicationScopes: {
        include: {
          translations: {
            include: {
              locale: true,
            },
          },
        },
      },
    },
  }

  const { data } = await serverFetcher(`/sectors/single/${id}`, {
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
    ) as SectorTranslation,
    applicationScopes: getTranslationOfList(
      locale as Locale,
      data.applicationScopes
    ),
  } as Sector
}
