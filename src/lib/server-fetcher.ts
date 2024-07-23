import 'server-only'
import { cookies } from 'next/headers'
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

  const xApiKey = process.env.X_API_KEY
  const xApiKeyName = process.env.X_API_KEY_NAME
  const hasCredentials = xApiKey && xApiKeyName

  const apiKeyCredentials = hasCredentials && {
    ['x-api-key']: xApiKey,
    ['x-api-key-name']: xApiKeyName,
  }

  const token = cookies().get('accessToken')?.value

  const res = await fetch(url, {
    // ...(fargs?.cache !== 'no-store' && {
    //   next: { revalidate: 60 * 60 * 24 },
    // }),
    cache: 'no-store',
    ...fargs,
    headers: {
      Authorization: `Bearer ${token}`,
      ...apiKeyCredentials,
      ...fargs?.headers,
    },
  })
  const data = await res.json()
  const headers = res.headers

  return {
    data,
    headers,
  }
}
