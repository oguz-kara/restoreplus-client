import { serverFetcher } from '@/lib/server-fetcher'

const query = {
  include: {
    featuredImage: true,
    translations: {
      include: {
        locale: true,
      },
    },
    blogPostCategoryInformationTranslations: {
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
        blogPostCategoryInformationTranslations: {
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

export async function getSingleCategoryById(id: string, locale: string = 'tr') {
  const { data } = await serverFetcher(`/blog-posts/categories/single/${id}`, {
    cache: 'no-store',
    body: JSON.stringify(query),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
    },
  })

  if (!data) return null

  return {
    ...data,
    blogPostCategoryTranslation: {
      ...data.translations.find(
        (item: BlogPostCategoryTranslation) => item.locale.locale === locale
      ),
    },
    blogPostCategoryInformationTranslation: {
      ...data.blogPostCategoryInformationTranslations.find(
        (item: BlogPostCategoryInformationTranslation) =>
          item.locale.locale === locale
      ),
    },
    subCategories: data.subCategories.map((item: BlogPostCategory) => {
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
  } as BlogPostCategoryWithOneTranslation
}
