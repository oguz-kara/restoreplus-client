import { Locale } from '@/i18n/types'
import { serverFetcher } from '@/lib/server-fetcher'
import {
  getTranslation,
  getTranslationOfList,
} from '@/utils/translations-utils'

export async function getProductById(id: string, locale: Locale = 'tr') {
  const query = {
    include: {
      featuredImage: true,
      translations: {
        include: {
          locale: true,
        },
      },
      categories: {
        include: {
          translations: {
            include: {
              locale: true,
            },
          },
        },
      },
      sectors: {
        include: {
          featuredImage: true,
          translations: {
            include: {
              locale: true,
            },
          },
        },
      },
      documents: {
        include: {
          translations: {
            include: {
              locale: true,
              file: true,
            },
          },
          documentCategory: {
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

  const { data } = await serverFetcher(`/products/single/${id}`, {
    body: JSON.stringify(query),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!data) return null

  const { translations, ...restData } = data

  return {
    ...restData,
    translation: getTranslation(locale, translations),
    categories: getTranslationOfList(locale, data.categories),
    sectors: getTranslationOfList(locale, data.sectors),
    documents: [
      ...getTranslationOfList<Document>(locale, data.documents).map(
        ({ documentCategory, ...rest }) => ({
          ...rest,
          documentCategory: {
            ...documentCategory,
            translation: getTranslation(locale, documentCategory?.translations),
          },
        })
      ),
    ],
  } as ProductWithTranslation
}

export const getProductsByCategoryIdOrIds = async (
  id: number | number[],
  lang: Locale
) => {
  try {
    if (Array.isArray(id)) {
      const { data } = await serverFetcher(`/products/all`, {
        method: 'POST',
        body: JSON.stringify({
          where: {
            categories: {
              some: {
                id: {
                  in: id,
                },
              },
            },
          },
        }),
      })

      return getTranslationOfList(lang, data.data) as ProductWithTranslation[]
    } else {
      const { data } = await serverFetcher(`/products/all`, {
        method: 'POST',
        body: JSON.stringify({
          where: {
            categories: {
              some: {
                id,
              },
            },
          },
        }),
      })

      return getTranslationOfList(lang, data.data) as ProductWithTranslation[]
    }
  } catch (err: any) {
    console.log({ err })
    return null
  }
}
