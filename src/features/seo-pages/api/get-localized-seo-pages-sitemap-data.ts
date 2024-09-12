import { serverUrl } from '@/config/get-env-fields'
import { SupportedLocale } from '@/i18n'
import { sdk } from '@/restoreplus-sdk'

export const getLocalizedSeoPagesSitemapData = async (
  locales: SupportedLocale[]
) => {
  const { data } = await sdk.seoPages.getAllByQuery({ take: 'all' })

  console.log({ data })

  return await Promise.all(
    data.map(async (seoPage: SeoPages) => {
      const generatedLangUrls = locales.map(
        (locale) =>
          `${serverUrl}/${locale}${seoPage.path === '/' ? '' : seoPage.path}`
      )

      if (seoPage.path === '/')
        return {
          url: `${serverUrl}`,
          changeFrequency: 'weekly',
          lastModified: new Date(seoPage.updatedAt),
          priority: 1,
          alternates: {
            languages: generatedLangUrls,
          },
        }
      else {
        return {
          url: `${serverUrl}${seoPage.path}`,
          changeFrequency: 'weekly',
          lastModified: seoPage.updatedAt,
          priority: 1,
          alternates: {
            languages: generatedLangUrls,
          },
        }
      }
    })
  )
}
