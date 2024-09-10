import { Locale } from '@/i18n/types'
import { serverFetcher } from '@/lib/server-fetcher'
import { sdk } from '@/restoreplus-sdk'
import { getTranslationOfList } from '@/utils/translations-utils'

export const getProductsBySectorId = async ({
  lang,
  id,
}: {
  lang: Locale
  id: number
}) => {
  if (!id || Number.isNaN(Number(id))) return null

  const data = await sdk.products.getAllByQuery({
    where: {
      sectors: {
        some: {
          id,
        },
      },
    },
    include: {
      translations: {
        include: {
          locale: true,
        },
      },
      featuredImage: true,
    },
  })

  if (!data || !data?.data || (data?.data?.length && data?.data?.length < 1))
    return null

  return data as null | { data: Product[]; pagination: Pagination }
}
