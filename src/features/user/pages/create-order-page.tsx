import serverConfig from '@/config/server-config.json'
import Container from '@/components/common/container'
import { advancedDataSearch } from '@/utils/fetch-data'
import { Locale, PropsWithLang } from '@/i18n/types'
import { getProperLanguage } from '@/i18n/utils'
import { getCategoryIds } from '@/features/product-categories/api/get-category-ids'
import { getSectorIds } from '@/features/sectors/api/get-sector-ids'
import Typography from '@/components/ui/typography'
import Image from '@/components/ui/image'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from '@/components/ui/link'
import { Badge } from '@/components/ui/badge'
import { getDictionary } from '@/i18n/get-dictionary'
import ProductFinderFilters from '@/features/product/components/product-finder-filters'
import { getFilteredCalculatedProducts } from '@/features/product/data/get-filtered-products'
import { consoleLog } from '@/utils/log-to-console'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/utils/format-price'

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
              {productData.data.length} {common.productFound}
            </Typography>
          </div>
          {productData.data.length < 1 ? (
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
                    <div key={i} className="h-full mb-2">
                      <Link
                        href={`/product/${product.id}/${product.slug}`}
                        lang={lang}
                      >
                        <Card className="h-full flex justify-between">
                          <div className="flex flex-col lg:flex-row">
                            <CardHeader className="relative">
                              {product.reductionDiscounts ? (
                                <div className="absolute top-[-5px] left-[-5px] w-[300px]">
                                  <div className="flex ">
                                    <Badge className="bg-primary text-xs rounded-none rounded-l-sm">
                                      {product.reductionDiscounts.type ===
                                      'PERCENTAGE'
                                        ? `%${product.reductionDiscounts.value} ${createOrderPage.reduction}`
                                        : null}
                                    </Badge>
                                    {product.sectorsDiscounts &&
                                      product.sectorsDiscounts.length > 0 && (
                                        <Badge className="bg-primary text-xs rounded-none rounded-r-sm">
                                          {getTotalSectorDiscountPercentage(
                                            product.sectorsDiscounts,
                                            createOrderPage.sectorDiscount
                                          )}
                                        </Badge>
                                      )}
                                  </div>
                                </div>
                              ) : null}
                              <div>
                                <Image
                                  src={`${serverConfig.remoteUrl}/${product.featuredImage?.path}`}
                                  alt={
                                    product.featuredImage?.alt
                                      ? product.featuredImage?.alt
                                      : product.name
                                  }
                                  width={100}
                                  height={100}
                                  style={{
                                    width: '150px',
                                    height: '75px',
                                    objectFit: 'contain',
                                  }}
                                />
                              </div>
                            </CardHeader>
                            <CardContent className="p-5">
                              <Typography as="h6" className="mb-1">
                                {product.name}
                              </Typography>
                              <Typography className="text-xs mb-2">
                                {product.productType}
                              </Typography>
                              {product.totalDiscount &&
                                product.totalDiscount > 0 && (
                                  <Typography className="text-gray-400 font-[300] text-xs line-through">
                                    {formatPrice(
                                      product.price,
                                      product.currencyCode
                                    )}
                                  </Typography>
                                )}
                              <Typography className="font-semibold">
                                {formatPrice(
                                  product.calculatedPrice,
                                  product.currencyCode
                                )}
                              </Typography>
                            </CardContent>
                          </div>
                          <CardFooter className="relative flex items-end">
                            {term && product.equivalents?.includes(term) ? (
                              <Badge className="absolute top-[-5px] right-[-5px]">
                                <Typography>
                                  {productFinder.equivalent}
                                </Typography>
                              </Badge>
                            ) : null}
                            <div>
                              <div>
                                <Button className="mb-1" variant="secondary">
                                  {createOrderPage.details}
                                </Button>
                              </div>
                              <div>
                                <Button className="flex-1 bg-green-600 text-white">
                                  {createOrderPage.addToCart}
                                </Button>
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    </div>
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

function getTotalSectorDiscountPercentage(sectorsDiscounts: any, text: string) {
  const percentage =
    sectorsDiscounts && sectorsDiscounts.length > 0
      ? sectorsDiscounts.reduce(
          (accumulator: number, currentValue: any) =>
            currentValue.type === 'PERCENTAGE'
              ? currentValue.value + accumulator
              : accumulator,
          0
        )
      : null

  return percentage ? `%${percentage} ${text}` : null
}
