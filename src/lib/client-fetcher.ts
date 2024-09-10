import { serverUrl } from '@/config/get-env-fields'
import Cookies from 'js-cookie'

export const clientFetcher = async (
  init: string | URL | globalThis.Request,
  fargs?: RequestInit
) => {
  const authToken = Cookies.get('token')
  let url = `${serverUrl}/api`

  url = (url as string) + init

  if (authToken) {
    const res = await fetch(url, {
      ...fargs,
      headers: {
        Authorization: `Bearer ${authToken}`,
        ...fargs?.headers,
      },
    })
    const data = await res.json()

    return data
  }

  const res = await fetch(url, fargs)
  const data = await res.json()

  return data
}
