import { serverUrl } from '@/config/get-env-fields'
import i18n, { SupportedLocale } from '@/i18n'
import { getProperLanguage } from '@/i18n/utils'
import { sdk } from '@/restoreplus-sdk'
import { Metadata } from 'next'

type SeoPageType = (pathname: string, locale: string) => Promise<Metadata>

export const getSeoPageByPathnameAndLocale: SeoPageType = async (
  pathname: string,
  locale: string
) => {
  const properLang = getProperLanguage(locale as SupportedLocale)
  const { data } = await sdk.seoPages.getAllByQuery(
    {
      where: {
        path: pathname === '' ? '/' : pathname,
      },
    },
    { lang: locale }
  )

  const localesData = await sdk.supportedLocales.getAll({ take: 'all' })
  const languages = localesData.data.map(
    (locale: any) => locale.locale
  ) as SupportedLocale[]

  const alternateLanguages = languages.reduce(
    // @ts-ignore
    (alternateLangs, languageCode) => {
      try {
        if (pathname === '/') {
          // @ts-ignore
          alternateLangs[
            languageCode
          ] = `${serverUrl}${pathname}${languageCode}`
          return alternateLanguages
        } else {
          // @ts-ignore
          alternateLangs[
            languageCode
          ] = `${serverUrl}/${languageCode}${pathname}`
          return alternateLanguages
        }
      } catch (err: any) {
        return alternateLangs
      }
    },
    {}
  ) as any

  const theCanonical =
    properLang === i18n.defaultLocale
      ? `${serverUrl}${pathname}`
      : `${serverUrl}/${properLang}${pathname}`

  if (data && Array.isArray(data) && data?.length > 0) {
    const pageData = data[0]

    return {
      title: pageData.translation.title,
      description: pageData.translation.description,
      keywords: pageData.translation.keywords,
      alternates: {
        canonical: theCanonical,
        languages: alternateLanguages,
      },
    }
  }

  return {
    title: 'Restoreplus High Tech Lubricants',
    description: 'Restoreplus High Tech Lubricants',
  }
}
