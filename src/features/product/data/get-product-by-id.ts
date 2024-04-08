import { serverFetcher } from '@/lib/server-fetcher'

export async function getProductById(id: string, locale: string = 'tr') {
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
    },
  }

  const { data } = await serverFetcher(`/products/single/${id}`, {
    cache: 'no-store',
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
    translation: {
      ...translations.find(
        (item: ProductTranslation) => item.locale.locale === locale
      ),
    },
    categories: data.categories.map((category: ProductCategory) => {
      const { translations, ...rest } = category

      const translation = translations.find(
        (translation) => translation.locale.locale === locale
      )

      if (!translation) throw new Error('Translation not found')

      return { ...rest, translation }
    }),
  } as ProductWithTranslation
}
