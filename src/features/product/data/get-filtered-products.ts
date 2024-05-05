import { serverFetcher } from '@/lib/server-fetcher'
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

  const { data } = await serverFetcher('/products/all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
  })

  return {
    data: data.data
      .filter((item: Product) =>
        item.translations.find(
          (translation) => translation.locale.locale === lang
        )
      )
      .map((item: Product) => {
        const { translations, ...rest } = item
        const translation = translations.find(
          (translation) => translation.locale.locale === lang
        )

        return {
          ...rest,
          translation,
        }
      }),
    pagination: data.pagination,
  } as { data: ProductWithTranslation[]; pagination: Pagination }
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

  const { data } = await serverFetcher(
    `/active-user/calculated-products/search?lang=${lang}&currency=${currencyCode}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(query),
    }
  )

  return data
}
