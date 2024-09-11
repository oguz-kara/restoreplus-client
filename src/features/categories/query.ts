export const blogPostCategoryQuery = {
  where: {
    id: { in: [1, 2, 3, 4, 5] },
  },
  select: {
    id: true,
    featuredImage: true,
    translations: {
      include: {
        locale: true,
      },
    },
    subCategories: {
      include: {
        translations: {
          include: {
            locale: true,
          },
        },
        subCategories: {
          include: {
            translations: {
              include: {
                locale: true,
              },
            },
          },
        },
      },
    },
  },
}
