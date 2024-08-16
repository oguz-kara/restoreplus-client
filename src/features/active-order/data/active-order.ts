import { clientFetcher } from '@/lib/client-fetcher'

export const getActiveOrderApi = async () => {
  const data = await clientFetcher('/active-order', {
    headers: {
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
  const data = await clientFetcher('/active-order', {
    method: 'post',
    headers: {
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
  const data = await clientFetcher(`/active-order?id=${lineId}`, {
    method: 'put',
    headers: {
      'x-api-key': 'null',
      'x-api-secret': 'null',
    },
    body: JSON.stringify({ quantity }),
  })
  return data
}

export const deleteOrderLineApi = async (lineId: number) => {
  const data = await clientFetcher(`/active-order?id=${lineId}`, {
    method: 'delete',
    headers: {
      'x-api-key': 'null',
      'x-api-secret': 'null',
    },
  })
  return data
}

export const createOrderApi = async () => {
  const data = await clientFetcher(`/create-order`, {
    headers: {
      'x-api-key': 'null',
      'x-api-secret': 'null',
    },
  })
  return data
}

export const setActiveOrderAddressApi = async (addressId: number) => {
  const data = await clientFetcher(
    `/active-order/address?addressId=${addressId}`,
    {
      headers: {
        'x-api-key': 'null',
        'x-api-secret': 'null',
      },
    }
  )
  return data
}

export const orderCancelRequest = async (orderId: number, note?: string) => {
  const data = await clientFetcher(
    `/active-order/cancelRequest?orderId=${orderId}`,
    {
      method: 'POST',
      body: JSON.stringify({ note }),
      headers: {
        'x-api-key': 'null',
        'x-api-secret': 'null',
      },
    }
  )
  return data
}
