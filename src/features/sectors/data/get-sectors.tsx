import { serverFetcher } from '@/lib/server-fetcher'

export async function getSectors(locale: string = 'tr') {
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

  const { data } = await serverFetcher(`/sectors/all`, {
    cache: 'no-store',
    body: JSON.stringify(query),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  console.log(data)

  if (!data?.data) return null

  return {
    data: data.data.map((item: Sector) => {
      return {
        ...item,
        translation: {
          ...item.translations.find((item) => item.locale.locale === locale),
        },
      }
    }),
  } as { data: SectorWithTranslation[]; pagination: Pagination }
}
