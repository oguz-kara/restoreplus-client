import { B2BApplicationFormDataType } from '@/features/b2b/schema/b2b-application.schema'
import { Address, Company } from '@/features/b2b/types'
import { serverFetcher } from '@/lib/server-fetcher'

export const b2bMethods = {
  registerRequest: async (data: B2BApplicationFormDataType) => {
    try {
      const { data: response } = await serverFetcher(
        '/v2/b2b-register-request',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      return response
    } catch (err: any) {
      return { message: err.message }
    }
  },
  getAcceptedRegisterRequestByToken: async (token?: string) => {
    try {
      if (!token) throw new Error('no token found!')
      const { data: response } = await serverFetcher(
        '/v2/b2b-register-request/user-info',
        {
          method: 'POST',
          body: JSON.stringify({ token }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      return response
    } catch (err: any) {
      return { message: err.message }
    }
  },
  registerUser: async ({
    email,
    name,
    password,
  }: {
    email: string
    name: string
    password: string
  }) => {
    try {
      const { data: response } = await serverFetcher(
        '/v2/b2b-register-request/register-user',
        {
          method: 'POST',
          body: JSON.stringify({ email, name, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      return response
    } catch (err: any) {
      return { message: err.message }
    }
  },
  setUserCompany: async (company: Company, token: string) => {
    try {
      const { data: response } = await serverFetcher(
        '/v2/b2b-register-request/company',
        {
          method: 'POST',
          body: JSON.stringify({ ...company, token }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      return response
    } catch (err: any) {
      return { message: err.message }
    }
  },
  setUserAddress: async ({
    shippingAddress,
    billingAddress,
    isSame,
    token,
  }: {
    shippingAddress: Address
    billingAddress?: Address
    isSame?: boolean
    token: string
  }) => {
    try {
      const { data: response } = await serverFetcher(
        '/v2/b2b-register-request/address',
        {
          method: 'POST',
          body: JSON.stringify({
            shippingAddress,
            billingAddress,
            isSame,
            token,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      return response
    } catch (err: any) {
      return { message: err.message }
    }
  },
}
