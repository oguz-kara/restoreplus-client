import { serverFetcher } from '@/lib/server-fetcher'

export async function getCategoriesWithSubCategories(locale: string = 'tr') {
  const query = {
    where: {
      id: { in: [1, 2, 3, 4, 5] },
    },
    include: {
      featuredImage: true,
      translations: {
        include: {
          locale: true,
        },
      },
      subCategories: {
        include: {
          translations: {
            include: {
              locale: true,
            },
          },
          subCategories: {
            include: {
              translations: {
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

  const result = await serverFetcher(`/blog-posts/categories/all`, {
    body: JSON.stringify(query),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
    },
  })

  if (!result || !result.data.data) return null

  return {
    data: result.data.data.map((item: BlogPostCategory) => {
      return {
        ...item,
        blogPostCategoryTranslation: {
          ...item.translations.find((item) => item.locale.locale === locale),
        },
        subCategories: item.subCategories.map((item) => {
          const { translations, ...rest } = item
          return {
            ...rest,
            blogPostCategoryTranslation: translations.find(
              (item) => item.locale.locale === locale
            ),
            subCategories: item.subCategories.map((item) => {
              const { translations, ...rest } = item
              return {
                ...rest,
                blogPostCategoryTranslation: translations.find(
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
