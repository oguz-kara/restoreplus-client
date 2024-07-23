export const getSingleProductQueryByLang = (lang: string) => {
  return {
    select: {
      id: true,
      name: true,
      translations: {
        where: {
          locale: {
            locale: lang,
          },
        },
        select: {
          productType: true,
          slug: true,
          metaTitle: true,
          metaDescription: true,
          description: true,
          equivalents: true,
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
      categories: {
        select: {
          id: true,
          order: true,
          translations: {
            where: {
              locale: {
                locale: lang,
              },
            },
            select: {
              name: true,
              slug: true,
              description: true,
              metaTitle: true,
              metaDescription: true,
              keywords: true,
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
        },
      },
      applicationScopes: {
        select: {
          id: true,
          order: true,
          translations: {
            where: {
              locale: {
                locale: lang,
              },
            },
            select: {
              name: true,
              slug: true,
              description: true,
              metaTitle: true,
              metaDescription: true,
              keywords: true,
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
        },
      },
      documents: {
        select: {
          id: true,
          order: true,
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
  }
}
