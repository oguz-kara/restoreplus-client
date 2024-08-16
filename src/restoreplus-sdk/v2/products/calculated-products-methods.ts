import { cookies } from 'next/headers'
import { Locale } from '@/i18n/types'
import { getProperLanguage } from '@/i18n/utils'
import { serverFetcher } from '@/lib/server-fetcher'
import { CalculatedProduct } from '@/features/product/types'

export const getCalculatedProductsMethods = (entityUrl: string) => ({
  getAll: async (
    metadata: Pagination & {
      lang?: string | undefined | null
      isAdmin?: boolean
    } = { isAdmin: false }
  ) => {
    const properLang = getProperLanguage(metadata?.lang as Locale)
    const authToken = cookies().get('accessToken')?.value

    let paginationQuery: string =
      metadata?.page && metadata?.take
        ? `&page=${metadata.page}&take=${metadata.take}`
        : ''

    const { data } = await serverFetcher(
      `/v2/${entityUrl}?lang=${properLang}${paginationQuery}`,
      {
        headers: {
          'Content-Type': 'application/json',
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
      }
    )

    return data as CalculatedProduct[] | null | undefined
  },
  searchCalculatedProducts: async (
    query: any,
    metadata: Pagination & {
      currencyCode?: string
      lang?: string | undefined | null
      isAdmin?: boolean
    } = { isAdmin: false }
  ) => {
    const properLang = getProperLanguage(metadata?.lang as Locale)
    const authToken = cookies().get('accessToken')?.value

    let paginationQuery: string =
      metadata?.page && metadata?.take
        ? `&page=${metadata.page}&take=${metadata.take}`
        : ''

    const { data } = await serverFetcher(
      `/v2/${entityUrl}/search?lang=${properLang}&currency=${metadata.currencyCode}${paginationQuery}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
        body: JSON.stringify(query),
      }
    )

    return data as CalculatedProduct[] | null | undefined
  },
})
