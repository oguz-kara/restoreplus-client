import { Locale } from '@/i18n/types'
import { serverFetcher } from '@/lib/server-fetcher'

export async function getBlogPostData(lang: Locale = 'tr') {
  const query = `?include.translations.include.locale=true&include.featuredImage=true`
  const { data } = await serverFetcher(`/blog-posts/all${query}`, {
    cache: 'no-store',
  })

  const blogPostList: BlogPost[] = data.data
  const pagination: Pagination = data.pagination

  const result: { data: BlogPostWithOneTranslation[]; pagination: Pagination } =
    {
      data: blogPostList.map((item) => ({
        ...item,
        blogPostTranslation: item.translations.find(
          (blogPostTranslation) => blogPostTranslation.locale.locale === lang
        ) as BlogPostTranslation,
      })),
      pagination,
    }

  console.log({ result: JSON.stringify(result, null, 4) })

  return result
}
