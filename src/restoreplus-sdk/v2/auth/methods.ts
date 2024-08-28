import 'server-only'

import { serverFetcher } from '@/lib/server-fetcher'
import { cookies } from 'next/headers'
import { RegisterFormDataType } from '@/features/auth/schema/register.schema'

export const getAuthMethods = () => {
  return {
    login: async (email: string, password: string) => {
      const Cookies = cookies()

      if (!email && !password)
        throw new Error('Email and password are required!')

      const { data, headers } = await serverFetcher('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
        },
        cache: 'no-store',
      })

      if (data.accessToken) {
        Cookies.set('accessToken', data.accessToken, {
          secure: true,
          httpOnly: true,
          expires: new Date(data.accessTokenExpiresAt),
        })
      }

      return { data, headers }
    },
    register: async (registerData: RegisterFormDataType) => {
      const { data } = await serverFetcher('/register', {
        method: 'POST',
        body: JSON.stringify(registerData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return data
    },
    verifyUserEmail: async (email: string, token: string) => {
      try {
        const { data } = await serverFetcher('/verify-email', {
          method: 'POST',
          body: JSON.stringify({ email, token }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (data.message)
          return {
            success: false,
            message: data.message,
          }

        if (data.success)
          return {
            success: true,
          }

        return { success: false }
      } catch (err: any) {
        console.log({ err })
      }
    },
  }
}
