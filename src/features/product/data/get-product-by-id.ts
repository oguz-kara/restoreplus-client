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

  return {
    ...data,
    translation: {
      ...data.translations.find(
        (item: ProductTranslation) => item.locale.locale === locale
      ),
    },
  } as ProductWithTranslation
}
