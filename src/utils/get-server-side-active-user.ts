import { cookies } from 'next/headers'
import { serverFetcher } from '@/lib/server-fetcher'

export const getServerSideActiveUser = async () => {
  const authToken = cookies().get('token')?.value

  if (authToken) {
    const { data } = await serverFetcher('/active-user', {
      headers: {
        authorization: authToken,
      },
    })

    console.log(data)

    return data
  }

  return null
}
