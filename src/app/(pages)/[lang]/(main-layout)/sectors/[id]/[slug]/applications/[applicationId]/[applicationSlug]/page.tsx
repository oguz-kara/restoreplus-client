import Container from '@/components/common/container'
import Section from '@/components/common/section'
import { Locale, ParamsWithLang } from '@/i18n/types'
import React from 'react'
import Typography from '@/components/ui/typography'
import serverConfig from '@/config/server-config.json'
import { getApplicationScopeById } from '@/features/application-scope/data/get-application-scope-by-id'
import MdxRenderer from '@/components/common/mdx-renderer'
import { getProductsByApplicationScopeId } from '@/features/product/data/get-products-by-application-scope-id'
import ListProductCards from '@/features/product/components/list-product-cards'
import { getDictionary } from '@/i18n/get-dictionary'
import { Metadata } from 'next'

type PageProps = ParamsWithId &
  ParamsWithSlug &
  ParamsWithLang & {
    params: {
      applicationId: string
      applicationSlug: string
    }
  }

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = params.id
  const lang = params.lang

  const applicationScope = await getApplicationScopeById(id, lang)

  return {
    title: applicationScope?.translation?.metaTitle,
    description: applicationScope?.translation?.metaDescription,
  }
}

export default async function Page({
  params: { id, slug, lang, applicationId, applicationSlug },
}: PageProps) {
  const applicationScope = await getApplicationScopeById(applicationId, lang)
  const productData = await getProductsByApplicationScopeId({
    lang,
    id: Number(applicationId),
  })

  const {
    applicationScope: {
      page: { productsTitle },
    },
  } = await getDictionary(lang)

  return (
    <div>
      <HeroSection data={applicationScope as ApplicationScopeWithTranslation} />
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
              {productsTitle}
              {(!lang || lang === 'en') && (
                <span className="capitalize">
                  {` `}
                  {applicationScope?.translation.name}
                </span>
              )}
            </Typography>
          </div>
          {productData && productData.data.length > 0 ? (
            <ListProductCards lang={lang} products={productData.data} />
          ) : null}
        </Section>
      </Container>
    </div>
  )
}

function HeroSection({ data }: { data: ApplicationScopeWithTranslation }) {
  return (
    <div
      className="flex items-center justify-center relative lg:h-[500px] bg-no-repeat bg-cover text-white text-center py-10"
      style={{
        backgroundImage: `url(${serverConfig.remoteUrl}/${data.featuredImage?.path})`,
      }}
    >
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
