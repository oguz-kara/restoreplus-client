export const getProductForNavbarQuery = (id: number) => {
  return {
    where: {
      categories: {
        some: {
          id,
        },
      },
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
