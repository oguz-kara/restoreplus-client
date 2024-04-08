import { cookies } from 'next/headers'
import { serverFetcher } from '@/lib/server-fetcher'

export const getServerSideActiveUser = async () => {
  const token = cookies().get('token')?.value
  const jwt = cookies().get('jwt')?.value

  if (token) {
    const { data } = await serverFetcher('/active-user', {
      headers: {
        ...(token && { authorization: `Bearer ${token}` }),
      },
      credentials: 'include',
    })

    return data
  }

  return null
}
