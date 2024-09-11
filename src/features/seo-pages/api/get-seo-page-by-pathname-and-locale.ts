import { serverUrl } from '@/config/get-env-fields'
import { sdk } from '@/restoreplus-sdk'

export const getSeoPageByPathnameAndLocale = async (
  pathname: string,
  locale: string
) => {
  const { data } = await sdk.seoPages.getAllByQuery(
    {
      where: {
        path: pathname === '' ? '/' : pathname,
      },
    },
    { lang: locale }
  )

  if (data && Array.isArray(data) && data?.length > 0) {
    const pageData = data[0]

    return {
      title: pageData.translation.title,
      description: pageData.translation.description,
      keywords: pageData.translation.keywords,
      alternates: {
        canonical: `${serverUrl}/${locale}${pathname}`,
      },
    }
  }

  return {
    title: 'Restoreplus High Tech Lubricants',
    description: 'Restoreplus High Tech Lubricants',
  }
}
