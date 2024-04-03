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
      const { accessToken: token, tokenExpiresDate } = data
      let expirationDate = new Date(tokenExpiresDate)
      Cookies.set('token', token)
      Cookies.set('token_expires', expirationDate.toLocaleString('en-US'))
      return true
    }

    return false
  } catch (error: any) {
    console.log({ loginError: error })
    return false
  }
}
