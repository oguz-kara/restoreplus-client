import { serverFetcher } from '@/lib/server-fetcher'
import { getBaseMethods } from '@/restoreplus-sdk/base-methods'

export const productMethods = {
  ...getBaseMethods('products'),
  getByFields: async ({
    categoryId,
    sectorId,
    applicationScopeId,
    lang,
    page,
    take,
    term,
  }: {
    categoryId?: number
    sectorId?: number
    applicationScopeId?: number
    lang?: string
    page?: number
    take?: number
    term?: string
  }) => {
    const { data } = await serverFetcher(
      `/v2/products/by-fields?lang=${lang}`,
      {
        method: 'POST',
        body: JSON.stringify({
          categoryId,
          sectorId,
          applicationScopeId,
          page,
          take,
          term,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  },
}
