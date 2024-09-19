import React from 'react'
import { PropsWithLang } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'
import { initialQuery } from '../queries/initial-query'
import { getSingleProductQueryByLang } from '../queries/get-single-product-query'
import { getDictionary } from '@/i18n/get-dictionary'
import serverConfig from '@/config/server-config.json'
import Typography from '@/components/ui/typography'
import Container from '@/components/common/container'
import Section from '@/components/common/section'
import MdxRenderer from '@/components/common/mdx-renderer'
import Image from '@/components/ui/image'
import ListDocuments from '../components/list-documents'
import ListProductCards from '../components/list-product-cards'
import { Button } from '@/components/ui/button'
import Link from '@/components/ui/link'
import AddProductToOfferButton from '../components/add-product-to-offer-button'
import { ArrowLeft } from 'lucide-react'
import '@/styles/github-markdown.css'

interface SingleProductPageProps extends PropsWithLang {
  id: string
  redirectBackSearchParam?: string
  slug: string
}

export default async function SingleProductPage({
  lang,
  redirectBackSearchParam,
  slug,
}: SingleProductPageProps) {
  const dict = await getDictionary(lang)
  const result = await sdk.products.getSingleByQuery(
    {
      where: {
        translations: {
          some: {
            slug,
          },
        },
      },
      ...getSingleProductQueryByLang(lang),
    },
    { lang }
  )

  console.log({ result })

  const ids = result.categories.map((category: any) => category.id)
  const data = await sdk.products.getAllByQuery(
    { where: { categories: { some: { id: { in: ids } } } }, ...initialQuery },
    { lang }
  )

  const getRedirectPath = (searchParam?: string) => {
    if (searchParam) {
      return `/${searchParam.split('.').join('/')}`
    }

    return `/product/finder`
  }

  return (
    <Container className="pb-10 px-5">
      <div className="py-10">
        <Link
          lang={lang as any}
          href={`${getRedirectPath(redirectBackSearchParam)}`}
        >
          <Button
            variant="ghost"
            className="p-0 hover:bg-transparent hover:text-gray-500"
          >
            <ArrowLeft className="mr-1" />
            {dict.product.single_product_back_button_text}
          </Button>
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 mb-10 lg:mb-0">
          <Image
            className="object-cover w-full rounded-md"
            src={`${serverConfig.remoteUrl}/${result?.featuredImage?.path}`}
            width={300}
            height={300}
            alt={result?.featuredImage?.alt || ''}
          />
        </div>
        <div className="flex-[2] lg:px-10">
          <div>
            <div className="border-b border-dashed border-gray-300 mb-5">
              <Typography
                as="h1"
                className="text-5xl text-gray-800 font-semibold mb-3"
              >
                {result?.name}
              </Typography>
              <Typography
                as="h3"
                className="pb-5 text-md text-gray-700 font-normal "
              >
                {result?.translation?.productType}
              </Typography>
            </div>
            <Typography
              as="h3"
              className="pb-5 text-md text-gray-700 font-normal leading-7"
            >
              {result.translation.metaDescription}
            </Typography>
            <AddProductToOfferButton productData={result} />
          </div>
          <div>
            <Section className="p-0">
              <MdxRenderer mdxText={result.translation.description} />
            </Section>
            {result?.documents?.length > 0 && (
              <Section>
                <ListDocuments
                  documents={result.documents}
                  lang={lang as any}
                />
              </Section>
            )}
            {data?.length && data?.length > 0 && (
              <Section>
                <Typography className="py-5 pb-10" as="h3">
                  {dict.product.similar_products_text}
                </Typography>
                <ListProductCards lang={lang as any} products={data} />
              </Section>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}
