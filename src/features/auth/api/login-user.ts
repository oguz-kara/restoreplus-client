import Cookies from 'js-cookie'
import { clientFetcher } from '@/lib/client-fetcher'

export const loginUser = async ({
  identifier,
  pwd,
}: {
  identifier: string
  pwd: string
}) => {
  try {
    const data = await clientFetcher('/auth/login', {
      body: JSON.stringify({ email: identifier, password: pwd }),
      method: 'POST',
    })

    if (data.user) {
      return true
    }

    return false
  } catch (error: any) {
    console.log({ loginError: error })
    return false
  }
}

export const logoutUser = async () => {
  try {
    const data = await clientFetcher('/auth/logout')

    return data
  } catch (error: any) {
    console.log({ loginError: error })
    return false
  }
}
