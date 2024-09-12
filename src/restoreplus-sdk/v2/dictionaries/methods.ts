import 'server-only'
import { SupportedLocale } from '@/i18n'
import { getProperLanguage } from '@/i18n/utils'
import { getApiKey } from '@/utils/get-api-key'

export const dictionaryMethods = {
  getDictionary: async (lang: SupportedLocale, metadata?: any) => {
    const properLang = getProperLanguage(lang)
    const apiKeyHeaders = getApiKey(metadata?.isAdmin)

    // const { data } = await serverFetcher(
    //   `/v2/translation-namespaces/extensions/all?lang=${properLang}`,
    //   {
    //     headers: {
    //       ...apiKeyHeaders,
    //     },
    //   }
    // )

    const res = await fetch(
      `https://data.restoreplus.store/api/v2/translation-namespaces/extensions/all?lang=${properLang}`,
      {
        cache: 'no-store',
        headers: {
          ['x-api-key']: process.env.REMOTE_X_API_KEY || '',
          ['x-api-key-name']: process.env.REMOTE_X_API_KEY_NAME || '',
        },
      }
    )

    const data = await res.json()

    return data
  },
}
