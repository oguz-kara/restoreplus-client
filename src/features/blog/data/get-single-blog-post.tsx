import { Locale } from '@/i18n/types'
import { serverFetcher } from '@/lib/server-fetcher'
import { getTranslation } from '@/utils/translations-utils'

export async function getSingleBlogPostById(id: string, lang: Locale = 'tr') {
  const query = `?include.translations.include.locale=true&include.featuredImage=true`
  const { data } = await serverFetcher(`/blog-posts/${id}${query}`)

  if (!data) return null

  const result = {
    ...data,
    translation: getTranslation(
      lang,
      data.translations
    ) as BlogPostCategoryWithOneTranslation,
  }

  return result as BlogPost
}
