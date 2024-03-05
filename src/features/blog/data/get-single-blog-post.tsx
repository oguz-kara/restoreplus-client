import { Locale } from '@/i18n/types'
import { serverFetcher } from '@/lib/server-fetcher'

export async function getSingleBlogPostById(id: string, lang: Locale = 'tr') {
  const query = `?include.translations.include.locale=true&include.featuredImage=true`
  const { data } = await serverFetcher(`/blog-posts/${id}${query}`, {
    cache: 'no-store',
  })

  if (!data) return null

  const result = {
    ...data,
    blogPostTranslation: data.translations.find(
      (blogPostTranslation: BlogPostTranslation) =>
        blogPostTranslation.locale.locale === lang
    ) as BlogPostTranslation,
  }

  return result as BlogPostWithOneTranslation
}
