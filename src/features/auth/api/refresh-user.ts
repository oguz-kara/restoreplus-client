import Cookies from 'js-cookie'
import { clientFetcher } from '@/lib/client-fetcher'

export const refreshToken = async () => {
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
    console.log({ resData: res.data, res })
    const { accessToken: token, tokenExpiresDate } = res.data
    console.log({ token, tokenExpiresDate })
    let expirationDate = new Date(tokenExpiresDate)
    console.log({ expirationDate })
    Cookies.set('token', token, { expires: expirationDate })
    Cookies.set('token_expires', expirationDate.toLocaleString('en-US'), {
      expires: expirationDate,
    })
    return true
  }

  return false
}
