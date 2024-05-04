import { cookies } from 'next/headers'
import { serverFetcher } from '@/lib/server-fetcher'

export const getServerSideActiveUser = async () => {
  const token = cookies().get('token')?.value
  const lang = cookies().get('lang')?.value
  const currency = cookies().get('currency')?.value

  if (token) {
    const { data } = await serverFetcher(
      `/active-user?lang=${lang}&currency=${currency}`,
      {
        headers: {
          ...(token && { authorization: `Bearer ${token}` }),
        },
        credentials: 'include',
      }
    )

    return data as ActiveUser
  }

  return null
}
