import { serverUrl } from '@/config/get-env-fields'

export const mutationFunction = async ({
  path,
  method = 'POST',
  body,
}: {
  path: string
  method: string
  body: any
}) => {
  let url = `${serverUrl}/api`

  url = (url as string) + path

  const res = await fetch(url, {
    method,
    ...(body && {
      body: JSON.stringify(body),
    }),
  })

  if (!res.ok) throw new Error('Failed to fetch data!')

  const data = await res.json()

  return data
}
