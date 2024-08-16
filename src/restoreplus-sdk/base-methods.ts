import 'server-only'
import { Locale } from '@/i18n/types'
import { getProperLanguage } from '@/i18n/utils'
import { serverFetcher } from '@/lib/server-fetcher'
import { getApiKey } from '@/utils/get-api-key'

export const getBaseMethods = (entityUrl: string) => ({
  create: async <T>(
    incomingData: T,
    metadata: {
      lang?: string | undefined | null
      query?: any
      isAdmin?: boolean
    } = { isAdmin: false }
  ) => {
    const properLang = getProperLanguage(metadata?.lang as Locale)
    const query = metadata?.query ? `&${metadata?.query}` : ''
    const apiKeyHeaders = getApiKey(metadata?.isAdmin)

    const { data } = await serverFetcher(
      `/v2/${entityUrl}?lang=${properLang}${query}`,
      {
        method: 'POST',
        body: JSON.stringify(incomingData),
        headers: {
          'Content-Type': 'application/json',
          ...apiKeyHeaders,
        },
      }
    )

    return data
  },
  update: async <T>(
    id: number,
    incomingData: T,
    metadata: {
      lang?: string | undefined | null
      query?: any
      isAdmin?: boolean
    } = { isAdmin: false }
  ) => {
    const properLang = getProperLanguage(metadata?.lang as Locale)
    const query = metadata?.query ? `&${metadata?.query}` : ''
    const apiKeyHeaders = getApiKey(metadata?.isAdmin)

    const { data } = await serverFetcher(
      `/v2/${entityUrl}/${id}?lang=${properLang}${query}`,
      {
        method: 'PUT',
        body: JSON.stringify(incomingData),
        headers: {
          'Content-Type': 'application/json',
          ...apiKeyHeaders,
        },
      }
    )

    return data
  },
  getAll: async (
    metadata: Pagination & {
      query?: any
      lang?: string | null
      isAdmin?: boolean
    } = { isAdmin: false }
  ) => {
    const properLang = getProperLanguage(metadata?.lang as Locale)
    const query = metadata?.query ? `&${metadata?.query}` : ''
    const apiKeyHeaders = getApiKey(metadata?.isAdmin)

    let paginationQuery: string =
      metadata?.page && metadata?.take
        ? `&page=${metadata.page}&take=${metadata.take}`
        : ''

    const { data } = await serverFetcher(
      `/v2/${entityUrl}/all?lang=${properLang}${paginationQuery}${query}`,
      {
        headers: {
          ...apiKeyHeaders,
        },
      }
    )

    return data
  },
  getAllByQuery: async (
    query: any,
    metadata: Pagination & {
      lang?: string | undefined | null
      isAdmin?: boolean
    } = { isAdmin: false }
  ) => {
    const properLang = getProperLanguage(metadata?.lang as Locale)
    const apiKeyHeaders = getApiKey(metadata?.isAdmin)

    let paginationQuery: string =
      metadata?.page && metadata?.take
        ? `&page=${metadata.page}&take=${metadata.take}`
        : ''

    const { data } = await serverFetcher(
      `/v2/${entityUrl}/all?lang=${properLang}${paginationQuery}`,
      {
        headers: {
          'Content-Type': 'application/json',
          ...apiKeyHeaders,
        },
        body: JSON.stringify(query),
        method: 'POST',
      }
    )

    return data
  },
  getById: async (
    id: number,
    metadata: {
      lang?: string | undefined | null
      isAdmin?: boolean
      query?: any
    } = {
      isAdmin: false,
    }
  ) => {
    const properLang = getProperLanguage(metadata?.lang as Locale)
    const { data } = await serverFetcher(
      `/v2/${entityUrl}/${id}?lang=${properLang}`
    )

    return data
  },
  getSingleByQuery: async (
    id: number,
    query: any,
    metadata: {
      lang?: string | undefined | null
      isAdmin?: boolean
    } = {
      isAdmin: false,
    }
  ) => {
    const properLang = getProperLanguage(metadata?.lang as Locale)
    const { data } = await serverFetcher(
      `/v2/${entityUrl}/single/${id}?lang=${properLang}`,
      {
        method: 'POST',
        body: JSON.stringify(query),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  },
  delete: async (id: number, { isAdmin = false }: { isAdmin?: boolean }) => {
    const apiKeyHeaders = getApiKey(isAdmin)

    const result = await serverFetcher(`/v2/${entityUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        ...apiKeyHeaders,
      },
    })

    return result
  },
  search: async (
    q: string | { q: string; fields: any },
    metadata: Pagination & {
      lang?: string | undefined | null
      query?: any
      isAdmin?: boolean
    } = { isAdmin: false }
  ) => {
    let paginationQuery: string =
      metadata?.page && metadata?.take
        ? `&page=${metadata.page}&take=${metadata.take}`
        : ''
    const properLang = getProperLanguage(metadata?.lang as Locale)
    const apiKeyHeaders = getApiKey(metadata?.isAdmin)

    const searchObject =
      typeof q !== 'string'
        ? Object.keys(q.fields).reduce(
            (acc: { [key: string]: string }, key: string) => {
              acc[key] = q.q
              return acc
            },
            {}
          )
        : { name: q }

    const { data } = await serverFetcher(
      `/v2/${entityUrl}/search?lang=${properLang}${paginationQuery}`,
      {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
          ...metadata?.query,
          search: searchObject,
        }),
        headers: {
          'Content-Type': 'application/json',
          ...apiKeyHeaders,
        },
      }
    )

    return data
  },
})
