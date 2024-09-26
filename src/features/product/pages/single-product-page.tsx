import React from 'react'
import { PropsWithLang } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'
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
import { getSimilarProductsByCategoryIds } from '../data/get-similar-products'
import BackButton from '@/components/common/back-button'
import Breadcumbs from '@/components/common/breadcumbs'

interface SingleProductPageProps extends PropsWithLang {
  id: string
  redirectBackSearchParam?: string
  slug: string
}

export default async function SingleProductPage({
  lang,
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

  const ids = result.categories?.map((category: any) => category.id)

  const data = ids
    ? await getSimilarProductsByCategoryIds(ids, result.id, lang)
    : null

  const breadcumbsData = [
    {
      title: dict.common.home_text,
      href: '/',
    },
    {
      title: dict.common.products_text,
      href: '/product/finder',
    },
    {
      title: result.name,
    },
  ]

  return (
    <Container className="pb-10 px-5">
      <div className="flex justify-between flex-wrap items-center py-10">
        <BackButton className="p-0" />
        <Breadcumbs
          className="border-none px-2 py-2"
          lang={lang}
          data={breadcumbsData}
        />
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 mb-10 lg:mb-0">
          <div className="bg-gray-100 rounded-lg">
            <Image
              className="object-cover w-full rounded-md"
              src={`${serverConfig.remoteUrl}/${result?.featuredImage?.path}`}
              width={300}
              height={300}
              alt={result?.featuredImage?.alt || ''}
            />
          </div>
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
                className="pb-5 text-lg text-gray-700 font-normal "
              >
                {result?.translation?.productType}
              </Typography>
            </div>
            <Typography
              as="h3"
              className="pb-5 text-lg text-gray-700 font-normal leading-7"
            >
              {result.translation.metaDescription}
            </Typography>
            <AddProductToOfferButton productData={result} />
          </div>
          <div>
            <Section className="p-0">
              <MdxRenderer className="font-barlow" mdxText={result.translation.description} />
            </Section>
            {result?.documents?.length > 0 && (
              <Section className="p-0 py-3">
                <Typography as="h3" className="py-3">
                  {dict.product.product_page_technical_data_sheets_title}
                </Typography>
                <ListDocuments
                  documents={result.documents}
                  lang={lang as any}
                />
              </Section>
            )}
            {data?.length && data?.length > 0 && (
              <Section className="p-0 py-3">
                <Typography className="py-3" as="h3">
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
