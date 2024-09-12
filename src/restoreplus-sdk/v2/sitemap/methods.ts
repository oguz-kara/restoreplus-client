import { serverFetcher } from '@/lib/server-fetcher'

export const sitemapMethods = {
  getSitemap: async () => {
    const { data } = await serverFetcher('/v2/sitemap', {
      method: 'GET',
    })

    return data
  },
}
