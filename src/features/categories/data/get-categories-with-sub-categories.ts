import { serverFetcher } from '@/lib/server-fetcher'

export async function getCategoriesWithSubCategories(locale: string = 'tr') {
  const query = {
    where: {
      id: { in: [1, 2, 3, 4, 5] },
    },
    include: {
      featuredImage: true,
      blogPostCategoryTranslations: {
        include: {
          locale: true,
        },
      },
      subCategories: {
        include: {
          blogPostCategoryTranslations: {
            include: {
              locale: true,
            },
          },
          subCategories: {
            include: {
              blogPostCategoryTranslations: {
                include: {
                  locale: true,
                },
              },
            },
          },
        },
      },
    },
  }

  const { data } = await serverFetcher(`/blog-posts/categories/all`, {
    cache: 'no-store',
    body: JSON.stringify(query),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
    },
  })

  if (!data?.data) return null

  return {
    data: data.data.map((item: BlogPostCategory) => {
      return {
        ...item,
        blogPostCategoryTranslation: {
          ...item.blogPostCategoryTranslations.find(
            (item) => item.locale.locale === locale
          ),
        },
        subCategories: item.subCategories.map((item) => {
          const { blogPostCategoryTranslations, ...rest } = item
          return {
            ...rest,
            blogPostCategoryTranslation: blogPostCategoryTranslations.find(
              (item) => item.locale.locale === locale
            ),
            subCategories: item.subCategories.map((item) => {
              const { blogPostCategoryTranslations, ...rest } = item
              return {
                ...rest,
                blogPostCategoryTranslation: blogPostCategoryTranslations.find(
                  (item) => item.locale.locale === locale
                ),
              }
            }),
          }
        }),
      }
    }),
  } as { data: BlogPostCategoryWithOneTranslation[]; pagination: Pagination }
}
