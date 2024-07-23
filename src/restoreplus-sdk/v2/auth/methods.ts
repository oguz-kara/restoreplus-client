import 'server-only'

import { serverFetcher } from '@/lib/server-fetcher'
import { cookies } from 'next/headers'

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
  }
}
