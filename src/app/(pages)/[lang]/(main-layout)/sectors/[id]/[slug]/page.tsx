import serverConfig from '@/config/server-config.json'
import Typography from '@/components/ui/typography'
import Container from '@/components/common/container'
import Section from '@/components/common/section'
import MdxRenderer from '@/components/common/mdx-renderer'
import { getDictionaryV2 } from '@/i18n/get-dictionary'
import { Locale } from '@/i18n/types'
import Link from '@/components/ui/link'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { getProductsBySectorId } from '@/features/product/data/get-products-by-sector-id'
import ListProductCards from '@/features/product/components/list-product-cards'
import InfoCard from '@/components/common/info-card'
import { Metadata } from 'next'
import { sdk } from '@/restoreplus-sdk'
import { getWithApplicationScopesQuery } from '@/features/sectors/queries/get-with-application-scopes.query'
import { serverUrl } from '@/config/get-env-fields'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = params.id
  const lang = params.lang

  const sector = await sdk.sectors.getById(id, { lang })

  const canonicalUrl = `${serverUrl}/${lang}/sectors/${id}/${sector?.translation?.slug}`

  return {
    title: sector?.translation?.metaTitle,
    description: sector?.translation?.metaDescription,
    keywords: sector?.translation?.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default async function Page({
  params: { id, lang, slug },
}: {
  params: { slug: string; id: string; lang: Locale }
}) {
  const result = await sdk.sectors.getSingleByQuery(
    Number(id),
    getWithApplicationScopesQuery
  )
  const productData = await getProductsBySectorId({ lang, id: Number(id) })
  if (!result) return 'no sector data found!'
  const dict = await getDictionaryV2(lang)

  return (
    <div>
      <HeroSection data={result} />
      <Container className="py-10">
        <Section>
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
              <div className="p-3 bg-primary rounded-sm mb-3">
                <Typography as="h6" className="font-normal">
                  {dict.common.application_scopes_text}
                </Typography>
              </div>
              {result.applicationScopes?.map(
                (applicationScope: ApplicationScope) => (
                  <div key={applicationScope.id}>
                    <Link
                      href={`/sectors/${id}/${slug}/applications/${applicationScope.id}/${applicationScope.translation.slug}`}
                      lang={lang}
                    >
                      <li
                        className={cn(
                          'hover:bg-gray-100 uppercase flex gap-5 justify-between text-lg p-3 border-b border-gray-300'
                        )}
                        key={applicationScope.id}
                      >
                        <Typography as="p">
                          {applicationScope.translation.name}
                        </Typography>
                        <ArrowRight />
                      </li>
                    </Link>
                  </div>
                )
              )}
            </div>
            <div className="flex-[3]">
              <MdxRenderer mdxText={result.translation.description} />
              {productData && productData.data.length > 0 ? (
                <>
                  <div className="py-10">
                    <Typography as="h6" className="text-xl font-[500]">
                      {dict.sector.products_used_in_the_sector_text}
                    </Typography>
                  </div>
                  <ListProductCards lang={lang} products={productData.data} />
                </>
              ) : null}
            </div>
          </div>
        </Section>
      </Container>
      <div className="lg:hidden">
        <InfoCard
          data={{
            title: dict.blog.found_by_users_title,
            buttonText: dict.blog.get_listed_button_text,
            text: dict.blog.found_by_users_description,
          }}
          lang={lang}
        />
      </div>
    </div>
  )
}

function HeroSection({ data }: { data: Sector }) {
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
              as="h3"
              className="lg:text-lg font-semibold relative text-gray-300 pb-5"
            >
              {data.translation.name}
            </Typography>
            <Typography
              className="relative font-normal text-sm lg:max-w-[764px]"
              as="p"
            >
              {data.translation.description}
            </Typography>
          </div>
        </Section>
      </Container>
    </div>
  )
}
