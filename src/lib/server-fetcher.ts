import 'server-only'
import serverConfig from '@/config/server-config.json'

const remoteUrl = serverConfig.remoteUrl

export const serverFetcher = async (
  init: string | URL | globalThis.Request,
  fargs?: RequestInit
) => {
  let url =
    process.env.NODE_ENV === 'development'
      ? `${remoteUrl}/api`
      : process.env.SERVER_URL

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
