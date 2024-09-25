import { serverUrl } from '@/config/get-env-fields'

export const publicServerFetcher = async (
  init: string | URL | globalThis.Request,
  fargs?: RequestInit
) => {
  let url = `${serverUrl}/api`

  url = (url as string) + init

  const res = await fetch(url, {
    ...fargs,
    headers: { ...fargs?.headers },
  })
  const data = await res.json()
  const headers = res.headers

  return {
    data,
    headers,
  }
}
