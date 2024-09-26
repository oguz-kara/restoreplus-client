import Breadcumbs from '@/components/common/breadcumbs'
import Container from '@/components/common/container'
import SearchInput from '@/components/common/search-input'
import { Alert } from '@/components/ui/alert'
import { ServerImage } from '@/components/ui/image'
import Typography from '@/components/ui/typography'
import ListDocumentsLine from '@/features/product/components/list-documents-line'
import { getProductsWithDocuments } from '@/features/product/data/get-products-with-documents'
import { getDictionary } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'
import { AlertCircle } from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function Page({
  params: { lang },
  searchParams: { q },
}: ParamsWithLang & SearchParamsWithTerm) {
  const dict = await getDictionary(lang)

  const { data: products } = await getProductsWithDocuments({
    lang,
    page: '1',
    limit: '100',
    term: q,
  })

  const breadcumbsData = [
    {
      title: dict.common.home_text,
      href: '/',
    },
    {
      title: dict.common.data_sheets_text,
      href: '/data-sheets',
    },
  ]

  if (!products || products.message) return notFound()

  return (
    <div className="bg-gray-100 min-h-screen">
      <Container className="px-2">
        <Breadcumbs data={breadcumbsData} lang={lang} />
        <div className="py-5">
          <Typography
            as="h1"
            className="uppercase text-5xl font-semibold text-foreground"
          >
            {dict.common.data_sheets_text}
          </Typography>
        </div>
        <SearchInput placeholder={dict.collections.search_for_product_text} />
        <div className="flex flex-col gap-3 rounded-lg">
          {!products || products.message || products.length <= 0 ? (
            <div>
              <Alert className="flex items-center gap-2" variant="default">
                <div>
                  <AlertCircle />
                </div>
                <div>{dict.common.no_data_found_text}</div>
              </Alert>
            </div>
          ) : (
            products.map((product: Product) => (
              <div
                key={product.id}
                className="bg-white py-2 rounded-lg inline-block"
              >
                {/* product information */}
                <div className="flex gap-3 justify-start items-center">
                  <div className="w-[60px] h-[60px] lg:w-[100px] lg:h-[100px] lg:flex-initial aspect-square">
                    <ServerImage
                      className="w-full h-full object-contain rounded-lg"
                      src={product.featuredImage?.path || '/'}
                      alt={product.featuredImage?.alt || 'product image'}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="lg:flex-initial p-5">
                    <Typography as="h5" className="font-bold uppercase">
                      {product.name}
                    </Typography>
                    <Typography className="text-sm uppercase">
                      {product.translation.productType}
                    </Typography>
                  </div>
                </div>
                {/* product data sheets */}
                <div className="p-3">
                  <ListDocumentsLine
                    documents={product.documents}
                    lang={lang as any}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  )
}
