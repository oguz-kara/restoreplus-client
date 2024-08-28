import Container from '@/components/common/container'
import { Locale, PropsWithLang } from '@/i18n/types'
import { getProperLanguage } from '@/i18n/utils'
import Typography from '@/components/ui/typography'
import { getDictionary } from '@/i18n/get-dictionary'
import ProductFinderFiltersV2 from '../components/product-finder-filters-v2'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Link from '@/components/ui/link'
import ListProductTabs from '../components/list-product-tabs'
import { Filter, Search } from 'lucide-react'
import { sdk } from '@/restoreplus-sdk'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface ProductFinderPageProps extends Pagination, PropsWithLang {
  term?: string
  categoryId?: string
  sectorId?: string
  applicationScopeId?: string
  facetValueIds: number[] | undefined
}

export default async function ProductFinderPageV2({
  lang,
  categoryId,
  sectorId,
  applicationScopeId,
  term,
  facetValueIds,
}: ProductFinderPageProps) {
  const properLang = getProperLanguage(lang)
  const { common, productFinder } = await getDictionary(properLang as Locale)

  const { data: categoryData } = await sdk.productCategories.getAllByQuery(
    { where: { parentCategory: null } },
    { lang }
  )

  const { data: sectorData } = await sdk.sectors.getAllByQuery(
    { where: { applicationScopes: { some: {} } } },
    { lang }
  )

  const listCategoryData =
    await sdk.productCategoriesExtensions.getCategoriesWithProductCount({
      ...(categoryId && { categoryId: Number(categoryId) }),
      ...(sectorId && { sectorId: Number(sectorId) }),
      ...(applicationScopeId && {
        applicationScopeId: Number(applicationScopeId),
      }),
      ...(facetValueIds && facetValueIds.length > 0 && { facetValueIds }),
      term,
      lang: properLang as Locale,
    })

  const { data: facetData } = await sdk.facets.getAll({ lang })

  return (
    <Container>
      <div className="lg:flex lg:min-h-screen">
        <div className="block lg:hidden mt-3">
          <Accordion type="multiple">
            <AccordionItem value="1">
              <AccordionTrigger
                className="text-[#ccae00] text-lg p-5"
                showChevronIcon={false}
              >
                <div className="flex items-center gap-1">
                  <Filter size="20px" />
                  {common.filter}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ProductFinderFiltersV2
                  categoryData={categoryData}
                  sectorData={sectorData}
                  facetData={facetData}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="hidden lg:block">
          <ProductFinderFiltersV2
            categoryData={categoryData}
            sectorData={sectorData}
            facetData={facetData}
          />
        </div>
        <div className="flex-[3] px-5 py-10 pt-5 bg-gray-100">
          <ListProductTabs listCategoryData={listCategoryData}>
            <div>
              <Typography
                as="h5"
                className="text-4xl font-bold mb-5 text-gray-700"
              >
                {listCategoryData.reduce(
                  (prev, val) => prev + val.productCount,
                  0
                )}{' '}
                {` `}
                {common.productFound}
              </Typography>
            </div>
          </ListProductTabs>
          {listCategoryData.length < 1 ? (
            <Alert>
              <AlertTitle>
                <div className="flex items-center gap-2">
                  <Search size="20px" />
                  {common.noDataFound}
                </div>
              </AlertTitle>
              <AlertDescription>
                {productFinder.noProductsMessage}{' '}
                <Link href="/offer" lang={lang} className="text-blue-500">
                  {common.contactUs}
                </Link>
              </AlertDescription>
            </Alert>
          ) : null}
        </div>
      </div>
    </Container>
  )
}
