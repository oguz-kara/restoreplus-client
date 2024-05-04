import Cookies from 'js-cookie'
import { clientFetcher } from '@/lib/client-fetcher'

export const refreshToken = async () => {
  const token = Cookies.get('token')
  const tokenExpires = Cookies.get('token_expires')

  if (token && tokenExpires) {
    const res = await clientFetcher('/refresh')

    if (res.message === 'refresh_token_expired') {
      Cookies.remove('token')
      Cookies.remove('token_expires')
      return false
    }

    if (res.message) {
      console.error(res.message)
      return false
    }

    if (res.data.accessToken) {
      const { accessToken: token, tokenExpiresDate } = res.data
      let expirationDate = new Date(tokenExpiresDate)
      Cookies.set('token', token, { expires: expirationDate })
      Cookies.set('token_expires', expirationDate.toLocaleString('en-US'), {
        expires: expirationDate,
      })
      return true
    }

    return false
  }

  return false
}
