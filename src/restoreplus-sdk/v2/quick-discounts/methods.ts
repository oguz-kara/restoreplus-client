import 'server-only'
import { serverFetcher } from '@/lib/server-fetcher'

export const getQuickDiscountMethods = (path: string) => {
  return {
    createQuickDiscount: async (discountPercentage: number) => {
      const { data } = await serverFetcher(`/v2/${path}`, {
        method: 'POST',
        body: JSON.stringify({ discountPercentage }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return data
    },
    updateQuickDiscount: async (discountPercentage: number) => {
      const { data } = await serverFetcher(`/v2/${path}`, {
        method: 'PUT',
        body: JSON.stringify({ discountPercentage }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return data
    },
    deleteQuickDiscount: async () => {
      const { data } = await serverFetcher(`/v2/${path}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return data
    },
    getQuickDiscount: async () => {
      const { data } = await serverFetcher(`/v2/${path}`)

      return data
    },
  }
}
