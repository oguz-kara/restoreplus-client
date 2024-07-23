export const initialQuery = {
  select: {
    name: true,
    featuredImage: true,
    translations: {
      include: {
        locale: true,
      },
    },
    documents: {
      include: {
        translations: {
          include: {
            locale: true,
            file: true,
          },
        },
        documentCategory: {
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
    categories: {
      include: {
        translations: {
          include: {
            locale: true,
          },
        },
      },
    },
    productGroup: true,
    sectors: {
      include: {
        translations: {
          include: {
            locale: true,
          },
        },
      },
    },
    productVariants: {
      include: {
        price: true,
      },
    },
  },
}
