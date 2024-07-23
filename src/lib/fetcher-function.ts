export const getFetcherFunction = <T = any>(path: string) => {
  return async () => {
    let url =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api'
        : process.env.SERVER_URL

    url = (url as string) + path

    const res = await fetch(url, {
      method: 'GET',
    })

    if (!res.ok) throw new Error('Failed to fetch data!')

    const data = await res.json()

    if (data?.hasOwnProperty('pagination'))
      return data as { data: T[]; pagination: Pagination }

    return data as T
  }
}
