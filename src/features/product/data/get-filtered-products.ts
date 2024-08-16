import { serverFetcher } from '@/lib/server-fetcher'
import { sdk } from '@/restoreplus-sdk'
import { cookies } from 'next/headers'

export async function getFilteredProducts({
  categoryIds,
  sectorIds,
  lang,
}: {
  categoryIds: number[] | undefined
  sectorIds: number[] | undefined
  lang: string
}) {
  const query = {
    where: {
      ...(categoryIds &&
        categoryIds.length > 0 && {
          categories: {
            some: {
              id: {
                in: categoryIds,
              },
            },
          },
        }),
      ...(sectorIds &&
        sectorIds.length > 0 && {
          sectors: {
            some: {
              id: {
                in: sectorIds,
              },
            },
          },
        }),
    },

    include: {
      translations: {
        include: {
          locale: true,
        },
      },
      featuredImage: true,
    },
  }

  const result = await sdk.products.getAllByQuery(query, { lang })

  return result as { data: Product[]; pagination: Pagination }
}

export async function getFilteredCalculatedProducts({
  categoryIds,
  sectorIds,
  lang,
}: {
  categoryIds: number[] | undefined
  sectorIds: number[] | undefined
  lang: string
}) {
  const currencyCode = cookies().get('currency')?.value || 'USD'
  const token = cookies().get('token')?.value

  const result = await serverFetcher(
    `/v2/calculated-products/search?lang=${lang}&currency=${currencyCode}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({}),
    }
  )

  return result
}
