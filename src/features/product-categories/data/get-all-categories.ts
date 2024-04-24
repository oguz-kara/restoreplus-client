import { Locale } from '@/i18n/types'
import { serverFetcher } from '@/lib/server-fetcher'
import { getTranslationOfList } from '@/utils/translations-utils'

export const getAllCategories = async (lang: Locale) => {
  const query = {
    include: {
      translations: {
        include: {
          locale: true,
        },
      },
      featuredImage: true,
    },
  }

  const { data } = await serverFetcher('/products/categories/all', {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return {
    data: getTranslationOfList(lang, data.data),
    pagination: data.pagination,
  } as {
    data: ProductCategoryWithTranslation[]
    pagination: Pagination
  }
}
