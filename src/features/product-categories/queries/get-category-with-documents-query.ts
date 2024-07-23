export const getCategoryWithDocumentsQuery = (lang: string) => {
  return {
    orderBy: {
      order: 'asc',
    },
    select: {
      id: true,
      translations: {
        where: {
          locale: {
            locale: lang,
          },
        },
        select: {
          name: true,
          locale: {
            select: {
              locale: true,
            },
          },
        },
      },
      documents: {
        select: {
          id: true,
          file: {
            select: {
              id: true,
              name: true,
            },
          },
          featuredImage: {
            select: {
              id: true,
              path: true,
              alt: true,
            },
          },
          translations: {
            where: {
              locale: {
                locale: lang,
              },
            },
            select: {
              name: true,
              locale: {
                select: {
                  locale: true,
                },
              },
            },
          },
        },
      },
    },
  }
}
