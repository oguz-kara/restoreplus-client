import { sdk } from '@/restoreplus-sdk'
import { initialQuery } from '../queries/initial-query'

export const getSimilarProductsByCategoryIds = async (
  ids: number[],
  forProductId: number,
  lang: string
) => {
  const { data } = await sdk.products.getAllByQuery(
    {
      where: {
        AND: [
          {
            categories: {
              some: {
                id: {
                  in: ids,
                },
              },
            },
          },
          {
            id: {
              not: forProductId,
            },
          },
        ],
      },
      ...initialQuery,
    },
    { lang }
  )

  return data
}
