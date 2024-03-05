export const clientFetcher = async (
  init: string | URL | globalThis.Request,
  fargs?: RequestInit
) => {
  let url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api'
      : process.env.SERVER_URL

  url = (url as string) + init

  const res = await fetch(url, fargs)
  const data = await res.json()

  return data
}
