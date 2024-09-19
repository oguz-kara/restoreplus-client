import Container from '@/components/common/container'
import Section from '@/components/common/section'
import { ParamsWithLang } from '@/i18n/types'
import React from 'react'
import Typography from '@/components/ui/typography'
import serverConfig from '@/config/server-config.json'
import MdxRenderer from '@/components/common/mdx-renderer'
import ListProductCards from '@/features/product/components/list-product-cards'
import { getDictionary } from '@/i18n/get-dictionary'
import { Metadata } from 'next'
import { sdk } from '@/restoreplus-sdk'
import { serverUrl } from '@/config/get-env-fields'
import { consoleLog } from '@/utils/log-to-console'
import { ServerImage } from '@/components/ui/image'

type PageProps = ParamsWithId &
  ParamsWithSlug &
  ParamsWithLang & {
    params: {
      id: string
      slug: string
    }
  }

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slug = params.slug
  const lang = params.lang

  const applicationScope = await sdk.applicationScopes.getSingleByQuery(
    {
      where: {
        translations: {
          some: {
            slug,
          },
        },
      },
    },
    {
      lang,
    }
  )

  const canonicalUrl = `${serverUrl}/${lang}/application-scope/${applicationScope?.translation?.slug}`

  return {
    title: applicationScope?.translation?.metaTitle,
    description: applicationScope?.translation?.metaDescription,
    keywords: applicationScope?.translation?.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default async function Page({ params: { lang, slug } }: PageProps) {
  const { data: products } = (await sdk.products.getAllByQuery(
    {
      where: {
        applicationScopes: {
          some: {
            translations: {
              some: {
                slug,
              },
            },
          },
        },
      },
    },
    { lang }
  )) as {
    data: Product[]
    pagination: Pagination
  }

  const applicationScope = await sdk.applicationScopes.getSingleByQuery(
    {
      where: {
        translations: {
          some: {
            slug,
          },
        },
      },
    },
    {
      lang,
    }
  )

  const dict = await getDictionary(lang)

  return (
    <div>
      <HeroSection data={applicationScope as ApplicationScope} />
      <Container>
        <Section>
          <MdxRenderer
            mdxText={applicationScope?.translation?.description as string}
          />
        </Section>
        <Section>
          <div className="py-10">
            <Typography as="h6" className="text-xl font-semibold">
              {lang === 'tr' && (
                <span className="capitalize">
                  {applicationScope?.translation.name}
                  {` `}
                </span>
              )}
              {dict.common.application_scopes_text}
              {(!lang || lang === 'en') && (
                <span className="capitalize">
                  {` `}
                  {applicationScope?.translation.name}
                </span>
              )}
            </Typography>
          </div>
          <div className="pb-10">
            {products && products.length > 0 ? (
              <ListProductCards lang={lang} products={products} />
            ) : null}
          </div>
        </Section>
      </Container>
    </div>
  )
}

function HeroSection({ data }: { data: ApplicationScope }) {
  consoleLog({
    imagePath: `url(${serverConfig.remoteUrl}${data.featuredImage?.path})`,
  })
  return (
    <div className="overflow-hidden flex items-center justify-center relative lg:h-[500px] bg-no-repeat bg-cover text-white text-center py-10">
      <ServerImage
        className="block absolute top-0 bottom-0 left-0 right-0 object-cover h-full w-full"
        src={data?.featuredImage?.path || '/'}
        width={500}
        height={500}
        alt="product category image"
      />
      <Container>
        <Section>
          <div className="flex items-center justify-center flex-col">
            <div className="bg-[rgba(0,0,0,0.7)] absolute top-0 left-0 right-0 bottom-0"></div>
            <div className="relative flex flex-col gap-5 items-center pb-5">
              <Typography
                as="h1"
                className="lg:text-3xl font-bold text-white capitalize text-primary"
              >
                {data.translation.name}
              </Typography>
            </div>
            <Typography
              className="relative font-normal text-sm lg:max-w-[764px]"
              as="p"
            >
              {data.translation.metaDescription}
            </Typography>
          </div>
        </Section>
      </Container>
    </div>
  )
}