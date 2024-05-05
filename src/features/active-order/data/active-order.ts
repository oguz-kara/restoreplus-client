import { clientFetcher } from '@/lib/client-fetcher'
import Cookies from 'js-cookie'

export const getActiveOrderApi = async () => {
  const token = Cookies.get('token')

  if (!token) return null

  const data = await clientFetcher('/active-order', {
    headers: {
      authorization: `Bearer ${token}`,
      'x-api-key': 'null',
      'x-api-secret': 'null',
    },
  })

  return data
}

export const adjustOrderLineApi = async ({
  quantity,
  productVariantId,
  currencyCode,
}: {
  quantity: number
  productVariantId: number
  currencyCode: string
}) => {
  const token = Cookies.get('token')

  if (!token) return null

  const data = await clientFetcher('/active-order', {
    method: 'post',
    headers: {
      authorization: `Bearer ${token}`,
      'x-api-key': 'null',
      'x-api-secret': 'null',
    },
    body: JSON.stringify({ quantity, productVariantId, currencyCode }),
  })
  return data
}

export const updateOrderLineApi = async ({
  lineId,
  quantity,
}: {
  lineId: number
  quantity: number
}) => {
  const token = Cookies.get('token')

  if (!token) return null

  const data = await clientFetcher(`/active-order?id=${lineId}`, {
    method: 'put',
    headers: {
      authorization: `Bearer ${token}`,
      'x-api-key': 'null',
      'x-api-secret': 'null',
    },
    body: JSON.stringify({ quantity }),
  })
  return data
}

export const deleteOrderLineApi = async (lineId: number) => {
  const token = Cookies.get('token')

  if (!token) return null

  const data = await clientFetcher(`/active-order?id=${lineId}`, {
    method: 'delete',
    headers: {
      authorization: `Bearer ${token}`,
      'x-api-key': 'null',
      'x-api-secret': 'null',
    },
  })
  return data
}

export const createOrderApi = async () => {
  const token = Cookies.get('token')

  if (!token) return null

  const data = await clientFetcher(`/create-order`, {
    headers: {
      authorization: `Bearer ${token}`,
      'x-api-key': 'null',
      'x-api-secret': 'null',
    },
  })
  return data
}

export const setActiveOrderAddressApi = async (addressId: number) => {
  const token = Cookies.get('token')

  if (!token) return null

  const data = await clientFetcher(
    `/active-order/address?addressId=${addressId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
        'x-api-key': 'null',
        'x-api-secret': 'null',
      },
    }
  )
  return data
}
