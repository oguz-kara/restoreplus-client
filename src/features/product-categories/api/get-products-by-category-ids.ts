import { serverFetcher } from '@/lib/server-fetcher'

export async function getProductsByCategoryIds(ids: number[]) {
  const query = {
    where: {
      categories: {
        some: {
          id: {
            in: ids,
          },
        },
      },
    },
    include: {
      translations: {
        include: {
          locale: true,
        },
      },
    },
  }

  const { data } = await serverFetcher('/products/all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
  })

  return data
}
