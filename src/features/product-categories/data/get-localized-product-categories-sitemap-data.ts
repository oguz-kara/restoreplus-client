import { serverUrl } from '@/config/get-env-fields'
import { SupportedLocale } from '@/i18n'
import { sdk } from '@/restoreplus-sdk'
import { MetadataRoute } from 'next'

export const getLocalizedProductCategoriesSitemapData = async (
  locales: SupportedLocale[]
) => {
  const { data } = await sdk.productCategories.getAllByQuery({ take: 'all' })

  return data.map((productCategory: ProductCategory) => {
    const getUrl = (lang?: string) => {
      if (lang) {
        return `${serverUrl}/${lang}/product/categories/${productCategory.translation.slug}`
      }

      return `${serverUrl}/product/categories/${productCategory.translation.slug}`
    }

    const generatedLangUrls = locales.map((locale) => getUrl(locale))

    return {
      url: getUrl(),
      changeFrequency: 'weekly',
      lastModified: productCategory.updatedAt,
      priority: 1,
      alternates: {
        languages: generatedLangUrls,
      },
    }
  }) as MetadataRoute.Sitemap
}
