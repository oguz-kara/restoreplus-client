import { cookies } from 'next/headers'
import { clientFetcher } from '@/lib/client-fetcher'
import { serverFetcher } from '@/lib/server-fetcher'

export async function searchProducts(q: string = '', locale: string = 'tr') {
  const query = {
    include: {
      featuredImage: true,
      translations: {
        include: {
          locale: true,
        },
      },
    },
  }

  const { data } = await serverFetcher(
    `/products/search/?q=${q}&lang=${locale}`,
    {
      cache: 'no-store',
      body: JSON.stringify(query),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  if (!data?.data) return null

  const { pagination } = data

  return {
    data: data.data.map((item: Product) => {
      return {
        ...item,
        translation: {
          ...item.translations.find((item) => item.locale.locale === locale),
        },
      }
    }),
    pagination,
  } as { data: ProductWithTranslation[]; pagination: Pagination }
}

export async function getProducts(locale: string = 'tr') {
  const query = {
    include: {
      featuredImage: true,
      translations: {
        include: {
          locale: true,
        },
      },
    },
  }

  const { data } = await serverFetcher(`/products/all?lang=${locale}`, {
    cache: 'no-store',
    body: JSON.stringify(query),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!data?.data) return null

  const { pagination } = data

  return {
    data: data.data.map((item: Product) => {
      return {
        ...item,
        translation: {
          ...item.translations.find((item) => item.locale.locale === locale),
        },
      }
    }),
    pagination,
  } as { data: ProductWithTranslation[]; pagination: Pagination }
}

export async function getCalculatedProductsForCompany(locale: string = 'tr') {
  const token = cookies().get('token')?.value

  if (token) {
    const data = await clientFetcher(`/active-user/products`, {
      cache: 'no-store',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })


    return data
  }

  return []
}

export async function getCalculatedProductForCompany(
  locale: string = 'tr',
  productId: number
) {
  const token = cookies().get('token')?.value

  if (token) {
    const { data } = await serverFetcher(
      `/active-user/calculated-products?lang=${locale}&productId=${productId}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }
    )


    if (!data) return null

    return data
  }

  console.error('no access token found at get-products of product feature!')

  return null
}
