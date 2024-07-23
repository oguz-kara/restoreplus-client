import { Locale } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'

export const getProductsByApplicationScopeId = async ({
  lang,
  id,
}: {
  lang: Locale
  id: number
}) => {
  if (!id || Number.isNaN(Number(id))) return null

  const data = await sdk.products.getAllByQuery({
    where: {
      applicationScopes: {
        some: {
          id,
        },
      },
    },
    select: {
      translations: {
        include: {
          locale: true,
        },
      },
      featuredImage: true,
    },
  })

  console.log({ apData: data })

  if (!data || !data.data || (data.data.length && data.data.length < 1))
    return null

  return data
}
