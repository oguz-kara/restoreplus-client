import { cookies } from 'next/headers'
import { sdk } from '@/restoreplus-sdk'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap = await sdk.sitemap.getSitemap()
  // just force to dynamic
  cookies()

  return sitemap
}
