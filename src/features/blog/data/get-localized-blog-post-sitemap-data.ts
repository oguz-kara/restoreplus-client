import { serverUrl } from '@/config/get-env-fields'
import { SupportedLocale } from '@/i18n'
import { sdk } from '@/restoreplus-sdk'
import { MetadataRoute } from 'next'

export const getLocalizedBlogPostSitemapData = async (
  locales: SupportedLocale[]
) => {
  const { data } = await sdk.blogPosts.getAllByQuery({ take: 'all' })

  return data.map((blogPost: BlogPost) => {
    const getUrl = (lang?: string) => {
      if (lang) {
        return `${serverUrl}/${lang}/blog/${blogPost.id}/${blogPost.translation.slug}`
      }

      return `${serverUrl}/blog/${blogPost.id}/${blogPost.translation.slug}`
    }

    const generatedLangUrls = locales.map((locale) => getUrl(locale))

    return {
      url: getUrl(),
      changeFrequency: 'weekly',
      lastModified: blogPost.updatedAt,
      priority: 1,
      alternates: {
        languages: generatedLangUrls,
      },
    }
  }) as MetadataRoute.Sitemap
}
