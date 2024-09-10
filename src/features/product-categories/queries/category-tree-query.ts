export const categoryTreeQuery = {
 
  select: {
    id: true,
    translations: {
      include: {
        locale: true,
      },
    },
    parentCategory: {
      select: {
        id: true,
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
    },
  },
}