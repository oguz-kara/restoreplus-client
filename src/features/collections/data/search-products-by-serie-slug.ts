import { sdk } from '@/restoreplus-sdk'

export const searchProductsByProductSerieSlug = async ({
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
            productSerie: {
              translations: { some: { slug, locale: { locale: lang } } },
            },
          },
        ],
      },
    },
    { lang }
  )
}
