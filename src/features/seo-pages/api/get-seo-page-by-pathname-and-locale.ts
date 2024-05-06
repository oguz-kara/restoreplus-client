import { serverFetcher } from '@/lib/server-fetcher'

export const getSeoPageByPathnameAndLocale = async (
  pathname: string,
  locale: string
) => {
  const { data } = await serverFetcher('/seo-pages/all', {
    method: 'POST',
    body: JSON.stringify({
      where: {
        path: pathname === '' ? '/' : pathname,
        locale: {
          locale,
        },
      },
    }),
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // consoleLog({ data })

  if (data?.data && data?.data?.length > 0) {
    const pageData = data.data[0]

    return {
      title: pageData.title,
      description: pageData.description,
    }
  }

  return {
    title: 'Restoreplus High Tech Lubricants',
    description: 'Restoreplus High Tech Lubricants',
  }
}
