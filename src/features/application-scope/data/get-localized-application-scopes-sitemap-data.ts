import { serverUrl } from '@/config/get-env-fields'
import { SupportedLocale } from '@/i18n'
import { sdk } from '@/restoreplus-sdk'
import { MetadataRoute } from 'next'

export const getLocalizedApplicationScopesSitemapData = async (
  locales: SupportedLocale[]
) => {
  const { data } = await sdk.applicationScopes.getAllByQuery({ take: 'all' })

  return data.map((applicationScope: ApplicationScope) => {
    const getUrl = (lang?: string) => {
      if (lang) {
        return `${serverUrl}/${lang}/sectors/${applicationScope.sectorId}/${applicationScope.sector?.translation.slug}/application-scope/${applicationScope.id}/${applicationScope.translation.slug}`
      }

      return `${serverUrl}/sectors/${applicationScope.sectorId}/${applicationScope.sector?.translation.slug}/application-scope/${applicationScope.id}/${applicationScope.translation.slug}`
    }

    const generatedLangUrls = locales.map((locale) => getUrl(locale))

    return {
      url: getUrl(),
      changeFrequency: 'weekly',
      lastModified: applicationScope.updatedAt,
      priority: 1,
      alternates: {
        languages: generatedLangUrls,
      },
    }
  }) as MetadataRoute.Sitemap
}
