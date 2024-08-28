import { Locale } from '@/i18n/types'
import { getProperLanguage } from '@/i18n/utils'
import { serverFetcher } from '@/lib/server-fetcher'
import { getApiKey } from '@/utils/get-api-key'

export const productCategoryExtensionMethods = {
  getProductCategoryTree: async (
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
      `/v2/product-category-tree?lang=${properLang}${paginationQuery}${query}`,
      {
        headers: {
          ...apiKeyHeaders,
        },
      }
    )

    return data
  },
  getCategoriesWithProductCount: async ({
    sectorId,
    categoryId,
    applicationScopeId,
    term,
    lang,
    facetValueIds,
  }: {
    sectorId?: number
    categoryId?: number
    applicationScopeId?: number
    term?: string
    lang: Locale
    facetValueIds?: number[]
  }) => {
    const { data } = await serverFetcher(
      `/v2/products/categories/count?lang=${lang}`,
      {
        method: 'POST',
        body: JSON.stringify({
          sectorId,
          categoryId,
          applicationScopeId,
          term,
          facetValueIds,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return data as {
      id: number
      name: string
      description?: string | null
      shortDescription: string | null
      productCount: number
    }[]
  },
}
