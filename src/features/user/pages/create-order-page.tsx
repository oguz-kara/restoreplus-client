import Container from '@/components/common/container'
import { advancedDataSearch } from '@/utils/fetch-data'
import { Locale, PropsWithLang } from '@/i18n/types'
import { getProperLanguage } from '@/i18n/utils'
import { getCategoryIds } from '@/features/product-categories/data/get-category-ids'
import { getSectorIds } from '@/features/sectors/api/get-sector-ids'
import Typography from '@/components/ui/typography'
import Image from '@/components/ui/image'
import { getDictionary } from '@/i18n/get-dictionary'
import ProductFinderFilters from '@/features/product/components/product-finder-filters'
import { getFilteredCalculatedProducts } from '@/features/product/data/get-filtered-products'
import CalculatedProductForActiveUserCard from '@/features/product/components/calculated-product-for-active-user-card'

interface CalculatedAndGetProductFinderSectorAndCategoryIdArguments {
  categorySlug?: string
  sectorSlug?: string
  subCategorySlug?: string
  subSectorSlug?: string
}

interface ProductFinderPageProps extends Pagination, PropsWithLang {
  categorySlug?: string
  sectorSlug?: string
  subCategorySlug?: string
  subSectorSlug?: string
  term?: string
}

export default async function CreateOrderPage({
  page,
  take,
  lang,
  categorySlug,
  sectorSlug,
  subCategorySlug,
  subSectorSlug,
  term,
}: ProductFinderPageProps) {
  const properLang = getProperLanguage(lang)
  const { productFinder, createOrderPage, common } = await getDictionary(
    properLang as Locale
  )

  const { data: categoryData } = await advancedDataSearch({
    page,
    take,
    name: 'products/categories',
    query: 'where.isTopLevelCategory=true',
    lang: properLang as Locale,
  })

  const { data: sectorData } = await advancedDataSearch({
    page,
    take,
    name: 'sectors',
    query: 'where.isTopLevelSector=true',
    lang: properLang as Locale,
  })

  const subCategories = categorySlug
    ? await advancedDataSearch({
        page,
        take,
        name: 'products/categories',
        query: `where.parentCategories.some.translations.some.slug=${
          categorySlug.split(',')[0]
        }`,
        lang: properLang as Locale,
      })
    : undefined

  const subSectors = sectorSlug
    ? await advancedDataSearch({
        page,
        take,
        name: 'sectors',
        query: `where.parentSectors.some.translations.some.slug=${sectorSlug}`,
        lang: properLang as Locale,
      })
    : undefined

  const { categoryId, sectorId } = calculateAndGetSectorAndCategoryId({
    categorySlug,
    subCategorySlug,
    sectorSlug,
    subSectorSlug,
  })

  const categoryIds =
    categoryData && categoryId
      ? await getCategoryIds(categoryData.data, categoryId.split(',')[1])
      : undefined

  const sectorIds =
    categoryData && sectorId
      ? await getSectorIds(sectorData.data, sectorId.split(',')[1])
      : undefined

  const productData = !term
    ? await getFilteredCalculatedProducts({
        categoryIds,
        sectorIds,
        lang: properLang,
      })
    : await advancedDataSearch({
        page,
        take,
        name: 'active-user/calculated-products',
        searchBy: 'name',
        searchByTranslation: ['productType', 'equivalents'],
        type: 'search',
        query: term,
        lang: properLang as Locale,
      })

  return (
    <Container>
      <div className="lg:flex lg:min-h-screen">
        <ProductFinderFilters
          categoryData={categoryData}
          subCategoryData={subCategories?.data}
          sectorData={sectorData}
          subSectorData={subSectors?.data}
        />
        {/* main */}
        <div className="flex-[3] p-5 bg-gray-100">
          <div>
            <Typography as="h5" className="mb-5">
              {productData?.data?.length} {common.productFound}
            </Typography>
          </div>
          {productData?.data?.length < 1 ? (
            <Image
              src={`/images/no-result-found.jpg`}
              alt="not results found image"
              width={300}
              height={300}
              style={{
                width: '50%',
                height: '300px',
                objectFit: 'cover',
              }}
            />
          ) : null}
          <div>
            {productData && productData.data && productData.data.length > 0
              ? productData.data.map(
                  (product: CalculatedProduct, i: number) => (
                    <CalculatedProductForActiveUserCard
                      key={i}
                      lang={lang}
                      product={product}
                      term={term}
                    />
                  )
                )
              : null}
          </div>
        </div>
      </div>
    </Container>
  )
}

function calculateAndGetSectorAndCategoryId({
  categorySlug,
  sectorSlug,
  subCategorySlug,
  subSectorSlug,
}: CalculatedAndGetProductFinderSectorAndCategoryIdArguments) {
  if (subCategorySlug && subSectorSlug) {
    return {
      categoryId: subCategorySlug,
      sectorId: subSectorSlug,
    }
  } else if (subCategorySlug) {
    return {
      categoryId: subCategorySlug,
      sectorId: sectorSlug || null,
    }
  } else if (subSectorSlug) {
    return {
      categoryId: categorySlug || null,
      sectorId: subSectorSlug,
    }
  } else {
    return {
      categoryId: categorySlug || null,
      sectorId: sectorSlug || null,
    }
  }
}
