import { Locale } from '@/i18n/types'
import { getProperLanguage } from '@/i18n/utils'
import { serverFetcher } from '@/lib/server-fetcher'

export async function getProductCategoryData({ lang }: { lang: string }) {
  const properLang = getProperLanguage(lang as Locale)
  console.log({ properLang })
  const { data } = await serverFetcher('/products/categories/all')

  const { data: categoryData, pagination } = data

  return {
    data: categoryData.map((category: ProductCategory) => {
      let translatedSubCategories: TranslatedProductCategory[] = []
      const { translations, subCategories, ...restCategory } = category
      const productCategoryTranslation = translations.find(
        (translation) => translation.locale.locale === properLang
      )

      if (subCategories && subCategories.length > 0) {
        translatedSubCategories = subCategories.map((subCategory) => {
          let translatedSubCategories: TranslatedProductCategory[] = []
          const { translations, subCategories, ...restSubCategory } =
            subCategory
          const subCategoryTranslation = translations.find(
            (translation) => translation.locale.locale === properLang
          )

          if (!subCategoryTranslation) throw new Error('translation not found!')

          translatedSubCategories = subCategories.map((item) => {
            const { translations, ...restItem } = item
            const itemTranslation = translations.find(
              (translation) => translation.locale.locale === properLang
            )

            if (!itemTranslation) throw new Error('translation not found!')

            return {
              ...itemTranslation,
              ...restItem,
            }
          })

          const { locale, ...restTranslation } = subCategoryTranslation

          return {
            ...restTranslation,
            ...restSubCategory,
            subCategories: translatedSubCategories,
          }
        })
      }

      if (!productCategoryTranslation) throw new Error('translation not found!')

      const { locale, ...restTranslation } = productCategoryTranslation

      return {
        ...restTranslation,
        ...restCategory,
        subCategories: translatedSubCategories,
      }
    }),
    pagination,
  }
}
