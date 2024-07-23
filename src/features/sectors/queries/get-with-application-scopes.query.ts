export const getWithApplicationScopesQuery = {
  select: {
    id: true,
    translations: {
      select: {
        name: true,
        slug: true,
        locale: {
          select: {
            locale: true,
          },
        },
      },
    },
    applicationScopes: {
      select: {
        id: true,
        translations: {
          select: {
            name: true,
            slug: true,
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
