import serverConfig from '@/config/server-config.json'
import Typography from '@/components/ui/typography'
import { getSectorById } from '@/features/sectors/api/get-sector-by-id'
import Container from '@/components/common/container'
import Section from '@/components/common/section'
import MdxRenderer from '@/components/common/mdx-renderer'
import { getDictionary } from '@/i18n/get-dictionary'
import { Locale } from '@/i18n/types'
import Link from '@/components/ui/link'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { getProductsBySectorId } from '@/features/product/data/get-products-by-sector-id'
import ListProductCards from '@/features/product/components/list-product-cards'
import InfoCard from '@/components/common/info-card'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = params.id
  const lang = params.lang

  const sector = await getSectorById(id, lang)

  return {
    title: sector?.translation?.metaTitle,
    description: sector?.translation?.metaDescription,
  }
}

export default async function Page({
  params: { id, lang, slug },
}: {
  params: { slug: string; id: string; lang: Locale }
}) {
  const result = await getSectorById(id, lang)
  const productData = await getProductsBySectorId({ lang, id: Number(id) })
  if (!result) return 'no sector data found!'
  const {
    applicationScope: { title },
    sectorPage: { productsTitle },
    blog: { page },
  } = await getDictionary(lang)

  return (
    <div>
      <HeroSection data={result} />
      <Container className="py-10">
        <Section>
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
              <div className="p-3 bg-primary rounded-sm mb-3">
                <Typography as="h6" className="font-normal">
                  {title}
                </Typography>
              </div>
              {result.applicationScopes?.map((applicationScope) => (
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
              ))}
            </div>
            <div className="flex-[3]">
              <MdxRenderer mdxText={result.translation.content} />
              <div className="py-10">
                <Typography as="h6" className="text-xl font-[500]">
                  {productsTitle}
                </Typography>
              </div>
              {productData && productData.data.length > 0 ? (
                <ListProductCards lang={lang} products={productData.data} />
              ) : null}
            </div>
          </div>
        </Section>
      </Container>
      <div className="lg:hidden">
        <InfoCard data={page.rightCard} />
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
              {data.translation.title}
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
