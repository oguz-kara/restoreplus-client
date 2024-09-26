import { sdk } from '@/restoreplus-sdk'

export const getProductsWithDocuments = async ({
  lang,
  page = '1',
  limit = '100',
  term,
}: {
  lang: string
  page: string
  limit: string
  term?: string
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
            documents: {
              some: {},
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        featuredImage: {
          select: {
            path: true,
            alt: true,
          },
        },
        translations: {
          select: {
            productType: true,
            locale: {
              select: {
                locale: true,
              },
            },
          },
        },
        documents: {
          orderBy: {
            order: 'asc',
          },
          select: {
            id: true,
            order: true,
            translations: {
              select: {
                name: true,
                locale: {
                  select: {
                    locale: true,
                  },
                },
              },
            },
            featuredImage: {
              select: {
                id: true,
                path: true,
                alt: true,
              },
            },
            file: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    },
    { lang, page, take: limit }
  )
}
