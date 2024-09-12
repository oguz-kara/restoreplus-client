import { serverUrl } from '@/config/get-env-fields'
import { SupportedLocale } from '@/i18n'
import { sdk } from '@/restoreplus-sdk'
import { MetadataRoute } from 'next'

export const getLocalizedProductsSitemapData = async (
  locales: SupportedLocale[]
) => {
  const { data } = await sdk.products.getAllByQuery({ take: 'all' })

  return data.map((product: Product) => {
    const getUrl = (lang?: string) => {
      if (lang) {
        return `${serverUrl}/${lang}/product/${product.id}/${product.translation.slug}`
      }

      return `${serverUrl}/product/${product.id}/${product.translation.slug}`
    }

    const generatedLangUrls = locales.map((locale) => getUrl(locale))

    return {
      url: getUrl(),
      changeFrequency: 'weekly',
      lastModified: product.updatedAt,
      priority: 1,
      alternates: {
        languages: generatedLangUrls,
      },
    }
  }) as MetadataRoute.Sitemap
}
