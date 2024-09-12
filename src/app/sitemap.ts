import { sdk } from '@/restoreplus-sdk'
import type { MetadataRoute } from 'next'

export const revalidate = 30

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap = await sdk.sitemap.getSitemap()

  return sitemap
}
