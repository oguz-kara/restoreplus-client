import { sdk } from '@/restoreplus-sdk'

export const searchProductsByApplicationSlug = async ({
  slug,
  lang,
  term,
}: {
  slug: string
  lang: string
  term: string
}) => {
  return await sdk.products.getAllByQuery(
    {
      where: {
        AND: [
          {
            name: {
              contains: term || '',
              mode: 'insensitive',
            },
          },
          {
            categories: {
              some: {
                translations: { some: { slug, locale: { locale: lang } } },
              },
            },
          },
        ],
      },
    },
    { lang }
  )
}
