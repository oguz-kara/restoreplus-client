import serverConfig from '@/config/server-config.json'
import Container from '@/components/common/container'
import { advancedDataSearch } from '@/utils/fetch-data'
import { Locale, PropsWithLang } from '@/i18n/types'
import ProductFinderFilters from '../components/product-finder-filters'
import { getProperLanguage } from '@/i18n/utils'
import { serverFetcher } from '@/lib/server-fetcher'
import { getCategoryIds } from '@/features/product-categories/api/get-category-ids'
import { getSectorIds } from '@/features/sectors/api/get-sector-ids'
import Typography from '@/components/ui/typography'
import Image from '@/components/ui/image'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from '@/components/ui/link'
import { Badge } from '@/components/ui/badge'
import { getDictionary } from '@/i18n/get-dictionary'

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

export default async function ProductFinderPage({
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
  const { productFinder, common } = await getDictionary(properLang as Locale)

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
    ? await getFilteredProducts({
        categoryIds,
        sectorIds,
        lang: properLang,
      })
    : await advancedDataSearch({
        page,
        take,
        name: 'products',
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
        <div className="flex-[3] p-5  bg-gray-100">
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
          <div className="grid xl:grid-cols-4 md:grid-cols-3 gap-5 auto-rows-fr">
            {productData && productData.data && productData.data.length > 0
              ? productData.data.map(
                  (product: ProductWithTranslation, i: number) => (
                    <div key={i} className="h-full">
                      <Link
                        className="h-full"
                        href={`/product/${product.id}/${product.translation.slug}`}
                        lang={lang}
                      >
                        <Card className="h-full">
                          <CardHeader>
                            <div>
                              <Image
                                src={`${serverConfig.remoteUrl}/${product.featuredImage?.path}`}
                                alt={
                                  product.featuredImage?.alt
                                    ? product.featuredImage?.alt
                                    : product.name
                                }
                                width={300}
                                height={300}
                                style={{
                                  width: '300px',
                                  height: '150px',
                                  objectFit: 'cover',
                                }}
                              />
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Typography as="h6" className="mb-1">
                              {product.name}
                            </Typography>
                            <Typography className="text-xs">
                              {product.translation.productType}
                            </Typography>
                          </CardContent>
                          <CardFooter>
                            {term &&
                            product.translation.equivalents?.includes(term) ? (
                              <Badge>
                                <Typography>
                                  {productFinder.equivalent}
                                </Typography>
                              </Badge>
                            ) : null}
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

export async function getFilteredProducts({
  categoryIds,
  sectorIds,
  lang,
}: {
  categoryIds: number[] | undefined
  sectorIds: number[] | undefined
  lang: string
}) {
  const query = {
    where: {
      ...(categoryIds &&
        categoryIds.length > 0 && {
          categories: {
            some: {
              id: {
                in: categoryIds,
              },
            },
          },
        }),
      ...(sectorIds &&
        sectorIds.length > 0 && {
          sectors: {
            some: {
              id: {
                in: sectorIds,
              },
            },
          },
        }),
    },

    include: {
      translations: {
        include: {
          locale: true,
        },
      },
      featuredImage: true,
    },
  }

  const { data } = await serverFetcher('/products/all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
    cache: 'no-store',
  })

  return {
    data: data.data
      .filter((item: Product) =>
        item.translations.find(
          (translation) => translation.locale.locale === lang
        )
      )
      .map((item: Product) => {
        const { translations, ...rest } = item
        const translation = translations.find(
          (translation) => translation.locale.locale === lang
        )

        return {
          ...rest,
          translation,
        }
      }),
    pagination: data.pagination,
  } as { data: ProductWithTranslation[]; pagination: Pagination }
}
