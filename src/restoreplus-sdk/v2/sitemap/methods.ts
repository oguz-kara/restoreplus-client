import 'server-only'

export const sitemapMethods = {
  getSitemap: async () => {
    const res = await fetch('https://data.restoreplus.store/api/v2/sitemap', {
      method: 'GET',
      headers: {
        ['x-api-key']: process.env.REMOTE_X_API_KEY
          ? process.env.REMOTE_X_API_KEY
          : process.env.X_API_KEY || '',
        ['x-api-key-name']: process.env.REMOTE_X_API_KEY
          ? process.env.REMOTE_X_API_KEY
          : process.env.X_API_KEY || '',
      },
    })

    const data = await res.json()

    console.log({ data })

    return data
  },
}
