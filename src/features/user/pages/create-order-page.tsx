import Container from '@/components/common/container'
import { Locale, PropsWithLang } from '@/i18n/types'
import { getProperLanguage } from '@/i18n/utils'
import Typography from '@/components/ui/typography'
import Image from '@/components/ui/image'
import { getDictionary } from '@/i18n/get-dictionary'
import ProductFinderFilters from '@/features/product/components/product-finder-filters'
import CalculatedProductForActiveUserCard from '@/features/product/components/calculated-product-for-active-user-card'
import { sdk } from '@/restoreplus-sdk'
import { CalculatedProduct } from '@/features/product/types'

interface CalculatedAndGetProductFinderSectorAndCategoryIdArguments {
  categorySlug?: string
  sectorSlug?: string
  subCategorySlug?: string
  subSectorSlug?: string
}

interface ProductFinderPageProps extends Pagination, PropsWithLang {
  term?: string
}

export default async function CreateOrderPage({
  page,
  take,
  lang,
  term,
}: ProductFinderPageProps) {
  const properLang = getProperLanguage(lang)
  const { common } = await getDictionary(properLang as Locale)

  const calculatedProducts = !term
    ? await sdk.calculatedProducts.getAll()
    : await sdk.calculatedProducts.searchCalculatedProducts({
        search: { name: term },
      })

  return (
    <Container>
      <div className="lg:flex lg:min-h-screen">
        <ProductFinderFilters
          categoryData={[]}
          subCategoryData={[]}
          sectorData={[]}
          subSectorData={[]}
        />
        {/* main */}
        <div className="flex-[3] p-5 bg-gray-100">
          <div>
            <Typography as="h5" className="mb-5">
              {calculatedProducts?.length} {common.productFound}
            </Typography>
          </div>
          {(calculatedProducts?.length || 0) < 1 ? (
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
            {calculatedProducts && calculatedProducts.length > 0
              ? calculatedProducts.map(
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