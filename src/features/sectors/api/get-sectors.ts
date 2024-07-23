import { Locale } from '@/i18n/types'
import { serverFetcher } from '@/lib/server-fetcher'
import { sdk } from '@/restoreplus-sdk'
import { getTranslationOfList } from '@/utils/translations-utils'

export const getSectors = async ({
  query = {},
  lang,
}: {
  query?: any
  lang: Locale
}) => {
  const data = await sdk.sectors.getAllByQuery(query, { lang })

  return data
}
