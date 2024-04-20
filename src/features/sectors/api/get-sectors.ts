import { Locale } from '@/i18n/types'
import { serverFetcher } from '@/lib/server-fetcher'
import { consoleLog } from '@/utils/log-to-console'
import { getTranslationOfList } from '@/utils/translations-utils'

export const getSectors = async ({
  query = {},
  lang,
}: {
  query?: any
  lang: Locale
}) => {
  const q = {
    select: {
      translations: {
        select: {
          locale: true,
        },
      },
      featuredImage: true,
    },
  }

  const { data } = await serverFetcher(`/sectors/all`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...q, ...query }),
  })

  return {
    data: getTranslationOfList(lang, data.data),
    pagination: data.pagination,
  } as {
    data: SectorWithTranslation[]
    pagination: Pagination
  }
}
