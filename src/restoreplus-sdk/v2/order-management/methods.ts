import 'server-only'
import { serverFetcher } from '@/lib/server-fetcher'
import { cookies } from 'next/headers'
import { getProperLanguage } from '@/i18n/utils'
import { Locale } from '@/i18n/types'
import { getAccessTokenFromCookie } from '@/utils/get-access-token-from-cookie'

export const orderManagementMethods = {
  //   done
  getActiveOrderForUser: async ({
    lang,
  }: {
    lang: string | undefined
    currencyCode: string | undefined
  }) => {
    const properLang = getProperLanguage(lang as Locale)
    const accessToken = cookies().get('accessToken')?.value
    const { data } = await serverFetcher(
      `/v2/user/orders/active-order?lang=${properLang}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    return data
  },
  //   done
  getUserOrders: async ({
    lang,
    currencyCode,
  }: {
    lang: string | undefined
    currencyCode: string | undefined
  }) => {
    const properLang = getProperLanguage(lang as Locale)
    const accessToken = getAccessTokenFromCookie()

    const { data } = await serverFetcher(
      `/v2/user/orders/?lang=${properLang}&currencyCode=${currencyCode}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    return data
  },
  completeOrderCreating: async ({
    lang,
    currencyCode,
  }: {
    lang: string | undefined
    currencyCode: string | undefined
  }) => {
    const properLang = getProperLanguage(lang as Locale)
    const accessToken = getAccessTokenFromCookie()

    const { data } = await serverFetcher(
      `/v2/user/orders/active-order/complete/?lang=${properLang}&currencyCode=${currencyCode}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    return data
  },
  //   done
  adjustOrderLine: async ({
    body,
    lang,
    currencyCode,
  }: {
    body: { quantity: number; productVariantId: number }
    lang: string | undefined
    currencyCode: string | undefined
  }) => {
    const properLang = getProperLanguage(lang as Locale)
    const accessToken = getAccessTokenFromCookie()

    const { data } = await serverFetcher(
      `/v2/user/orders/active-order/?lang=${properLang}&currencyCode=${currencyCode}`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  },
  //   done
  updateOrderlineQuantity: async ({
    lineId,
    body,
    lang,
    currencyCode,
  }: {
    lineId: number
    body: { quantity: number }
    lang: string | undefined
    currencyCode: string | undefined
  }) => {
    const properLang = getProperLanguage(lang as Locale)
    const accessToken = getAccessTokenFromCookie()

    const { data } = await serverFetcher(
      `/v2/user/orders/active-order/line/${lineId}?lang=${properLang}&currencyCode=${currencyCode}`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  },
  //   done
  removeOrderLineById: async ({
    lang,
    currencyCode,
    lineId,
  }: {
    lang: string | undefined
    currencyCode: string | undefined
    lineId: number
  }) => {
    const properLang = getProperLanguage(lang as Locale)
    const accessToken = getAccessTokenFromCookie()

    const { data } = await serverFetcher(
      `/v2/user/orders/active-order/${lineId}?lang=${properLang}&currencyCode=${currencyCode}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  },
  //   done
  setBillingAddress: async ({
    lang,
    currencyCode,
    body,
  }: {
    lang: string | undefined
    currencyCode: string | undefined
    body: {
      addressId: number
    }
  }) => {
    const properLang = getProperLanguage(lang as Locale)
    const accessToken = getAccessTokenFromCookie()

    const { data } = await serverFetcher(
      `/v2/user/orders/active-order/billing-address?lang=${properLang}&currencyCode=${currencyCode}`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  },
  //   done
  setShippingAddress: async ({
    lang,
    currencyCode,
    body,
  }: {
    lang: string | undefined
    currencyCode: string | undefined
    body: {
      addressId: number
      isSame?: boolean
    }
  }) => {
    const properLang = getProperLanguage(lang as Locale)
    const accessToken = getAccessTokenFromCookie()

    const { data } = await serverFetcher(
      `/v2/user/orders/active-order/shipping-address?lang=${properLang}&currencyCode=${currencyCode}`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  },
  orderCancelRequest: async ({
    lang,
    currencyCode,
    body,
  }: {
    lang: string | undefined
    currencyCode: string | undefined
    body: { orderId: number }
  }) => {
    const properLang = getProperLanguage(lang as Locale)
    const accessToken = getAccessTokenFromCookie()

    const { data } = await serverFetcher(
      `/v2/user/orders/active-order/cancel-request?lang=${properLang}&currencyCode=${currencyCode}`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  },
  createOrder: async () => {
    const authToken = cookies().get('authToken')
    const currencyCode = cookies().get('currency')?.value || 'USD'
    const lang = cookies().get('lang')?.value

    if (authToken) {
      const { data } = await serverFetcher(
        `/users/orders/active-order/complete?currency=${currencyCode}&lang=${lang}`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      )

      return data
    }

    throw new Error('Unauthorized!')
  },
}
