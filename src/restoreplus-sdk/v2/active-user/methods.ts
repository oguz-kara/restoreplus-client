import 'server-only'
import { Locale } from '@/i18n/types'
import { getProperLanguage } from '@/i18n/utils'
import { serverFetcher } from '@/lib/server-fetcher'
import { cookies } from 'next/headers'

export const activeUserMethods = {
  deleteShippingAddress: async ({
    lang,
    currencyCode,
  }: {
    lang: string
    currencyCode: string
  }) => {
    const properLang = getProperLanguage(lang as Locale)
    const accessToken = cookies().get('accessToken')?.value

    const { data } = await serverFetcher(
      `/v2/active-user/shipping-address?lang=${properLang}&currencyCode=${currencyCode}`,
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
  deleteBillingAddress: async ({
    lang,
    currencyCode,
  }: {
    lang: string
    currencyCode: string
  }) => {
    const properLang = getProperLanguage(lang as Locale)
    const accessToken = cookies().get('accessToken')?.value

    const { data } = await serverFetcher(
      `/v2/active-user/billing-address?lang=${properLang}&currencyCode=${currencyCode}`,
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
  createShippingAddress: async ({
    lang,
    currencyCode,
    addressData,
  }: {
    lang: string
    currencyCode: string
    addressData: Address
  }) => {
    const properLang = getProperLanguage(lang as Locale)
    const accessToken = cookies().get('accessToken')?.value

    const { data } = await serverFetcher(
      `/v2/active-user/shipping-address?lang=${properLang}&currencyCode=${currencyCode}`,
      {
        method: 'POST',
        body: JSON.stringify(addressData),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  },
  createBillingAddress: async ({
    lang,
    currencyCode,
    addressData,
  }: {
    lang: string
    currencyCode: string
    addressData: Address
  }) => {
    const properLang = getProperLanguage(lang as Locale)
    const accessToken = cookies().get('accessToken')?.value

    const { data } = await serverFetcher(
      `/v2/active-user/billing-address?lang=${properLang}&currencyCode=${currencyCode}`,
      {
        method: 'POST',
        body: JSON.stringify(addressData),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  },
  updateBillingAddress: async ({
    lang,
    currencyCode,
    addressData,
  }: {
    lang: string
    currencyCode: string
    addressData: Address & { addressId?: number }
  }) => {
    const properLang = getProperLanguage(lang as Locale)
    const accessToken = cookies().get('accessToken')?.value

    const { data } = await serverFetcher(
      `/v2/active-user/billing-address?lang=${properLang}&currencyCode=${currencyCode}`,
      {
        method: 'PUT',
        body: JSON.stringify(addressData),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  },
  updateShippingAddress: async ({
    lang,
    currencyCode,
    addressData,
  }: {
    lang: string
    currencyCode: string
    addressData: Address & { addressId?: number }
  }) => {
    const properLang = getProperLanguage(lang as Locale)
    const accessToken = cookies().get('accessToken')?.value

    const { data } = await serverFetcher(
      `/v2/active-user/shipping-address?lang=${properLang}&currencyCode=${currencyCode}`,
      {
        method: 'PUT',
        body: JSON.stringify(addressData),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  },
  updateActiveUser: async ({
    lang,
    currencyCode,
    userData,
  }: {
    lang: string
    currencyCode: string
    userData: { name: string }
  }) => {
    const properLang = getProperLanguage(lang as Locale)
    const accessToken = cookies().get('accessToken')?.value

    const { data } = await serverFetcher(
      `/v2/active-user?lang=${properLang}&currencyCode=${currencyCode}`,
      {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  },
  updateActiveUserCompany: async ({
    lang,
    currencyCode,
    companyData,
  }: {
    lang: string
    currencyCode: string
    companyData: {
      name: string
      description: string
      website: string
      fixedLine: string
      phoneNumber: string
      taxNumber: string
    }
  }) => {
    const properLang = getProperLanguage(lang as Locale)
    const accessToken = cookies().get('accessToken')?.value

    const { data } = await serverFetcher(
      `/v2/active-user/company?lang=${properLang}&currencyCode=${currencyCode}`,
      {
        method: 'PUT',
        body: JSON.stringify(companyData),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  },
  getOrdersOfActiveUser: async ({
    lang,
    currencyCode,
  }: {
    lang: string
    currencyCode: string
  }) => {
    const properLang = getProperLanguage(lang as Locale)
    const accessToken = cookies().get('accessToken')?.value

    const { data } = await serverFetcher(
      `/v2/active-user/orders?lang=${properLang}&currencyCode=${currencyCode}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  },
}
