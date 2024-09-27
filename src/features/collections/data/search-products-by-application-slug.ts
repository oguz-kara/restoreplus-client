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
  console.log({ slug, lang, term })
  return await sdk.products.getAllByQuery(
    {
      where: {
        AND: [
          {
            name: {
              contains: term || undefined,
              mode: 'insensitive',
            },
          },
          {
            applicationScopes: {
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
