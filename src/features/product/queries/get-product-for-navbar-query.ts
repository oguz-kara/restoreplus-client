export const getProductForNavbarQuery = ({
  categoryId,
  applicationScopeId,
}: {
  categoryId?: number
  applicationScopeId?: number
}) => {
  return {
    where: {
      ...(categoryId && {
        categories: {
          some: {
            id: categoryId,
          },
        },
      }),
      ...(applicationScopeId && {
        applicationScopes: {
          some: {
            id: applicationScopeId,
          },
        },
      }),
    },
    select: {
      id: true,
      name: true,
      featuredImage: {
        select: {
          id: true,
          path: true,
          alt: true,
        },
      },
      translations: {
        select: {
          productType: true,
          slug: true,
          locale: {
            select: {
              locale: true,
            },
          },
        },
      },
    },
  }
}
