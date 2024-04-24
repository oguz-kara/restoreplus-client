import { serverFetcher } from '@/lib/server-fetcher'

export async function getCategoryIds(
  subCategories: ProductCategory[],
  categoryId?: string
) {
  try {
    let data

    // If subCategories is not provided, fetch categories directly
    if (!subCategories) {
      const response = await serverFetcher(`/products/categories/${categoryId}`)
      data = response.data.subCategories
    } else {
      data = subCategories
    }

    const categoryIdsSet = new Set().add(Number(categoryId))

    if (categoryIdsSet) categoryIdsSet.add(Number(categoryId))

    if (data && Array.isArray(data)) {
      for (const category of data) {
        const { id, subCategories } = category
        categoryIdsSet.add(id)

        // Recursively fetch sub-categories
        if (subCategories && subCategories.length > 0) {
          const subCategoryIds = await getCategoryIds(subCategories, id)
          subCategoryIds.forEach((subCategoryId) =>
            categoryIdsSet.add(subCategoryId)
          )
        }
      }
    }

    return Array.from(categoryIdsSet) as number[]
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}
