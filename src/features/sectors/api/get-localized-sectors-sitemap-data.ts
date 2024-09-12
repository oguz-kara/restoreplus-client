import { serverUrl } from '@/config/get-env-fields'
import { SupportedLocale } from '@/i18n'
import { sdk } from '@/restoreplus-sdk'
import { MetadataRoute } from 'next'

export const getLocalizedSectorsSitemapData = async (
  locales: SupportedLocale[]
) => {
  const { data } = await sdk.sectors.getAllByQuery({ take: 'all' })

  return data.map((sector: Sector) => {
    const getUrl = (lang?: string) => {
      if (lang) {
        return `${serverUrl}/${lang}/sector/${sector.id}/${sector.translation.slug}`
      }

      return `${serverUrl}/sector/${sector.id}/${sector.translation.slug}`
    }

    const generatedLangUrls = locales.map((locale) => getUrl(locale))

    return {
      url: getUrl(),
      changeFrequency: 'weekly',
      lastModified: sector.updatedAt,
      priority: 1,
      alternates: {
        languages: generatedLangUrls,
      },
    }
  }) as MetadataRoute.Sitemap
}
