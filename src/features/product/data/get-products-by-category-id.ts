import { Locale } from '@/i18n/types'
import { serverFetcher } from '@/lib/server-fetcher'
import { getTranslationOfList } from '@/utils/translations-utils'

export const getProductsByCategoryId = async ({
  lang,
  id,
}: {
  lang: Locale
  id: number
}) => {
  if (!id || Number.isNaN(Number(id))) return null

  const { data } = await serverFetcher('/products/all', {
    method: 'POST',
    body: JSON.stringify({
      where: {
        categories: {
          some: {
            id,
          },
        },
      },
      include: {
        translations: {
          include: {
            locale: true,
          },
        },
        featuredImage: true,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!data || !data.data || (data.data.length && data.data.length < 1))
    return null

  return {
    data: getTranslationOfList(lang, data.data),
    pagination: data.pagination,
  } as {
    data: ProductWithTranslation[]
    pagination: Pagination
  }
}
