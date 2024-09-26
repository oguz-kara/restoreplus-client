import { sdk } from '@/restoreplus-sdk'

export const searchProductsByCategorySlug = async ({
  slug,
  lang,
  term,
}: {
  slug: string
  lang: string
  term: string | null
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
