import serverConfig from '@/config/server-config.json'
import Typography from '@/components/ui/typography'
import Container from '@/components/common/container'
import Section from '@/components/common/section'
import MdxRenderer from '@/components/common/mdx-renderer'
import {
  getProductById,
  getProductsByCategoryIdOrIds,
} from '../data/get-product-by-id'
import { PropsWithLang } from '@/i18n/types'
import Image from '@/components/ui/image'
import '@/styles/github-markdown.css'
import ListDocuments from '../components/list-documents'
import ListProductCards from '../components/list-product-cards'
import { redirect } from 'next/navigation'

interface SingleProductPageProps extends PropsWithLang {
  id: string
}

export default async function SingleProductPage({
  id,
  lang,
}: SingleProductPageProps) {
  const result = await getProductById(id, lang)
  if (!result || !result.translation) return redirect('/product/finder')
  const ids = result.categories.map((category) => category.id)
  const data = await getProductsByCategoryIdOrIds(ids, lang)

  return (
    <div className="lg:bg-gray-50">
      <HeroSection data={result} />
      <Container>
        <Section>
          <MdxRenderer mdxText={result.translation.description} />
        </Section>
        {result.sectors.length > 0 && (
          <Section>
            <Typography className="mb-4" as="h4">
              Kullanılan sektörler
            </Typography>
            <div className="flex flex-wrap gap-5">
              {result.sectors.map((sector, i) => (
                <div
                  className="inline-flex flex-col items-center justify-center"
                  key={i}
                >
                  <Image
                    className="mb-2 lg:h-[100px] lg:w-[100px] h-[50px] w-[50px] object-cover rounded-full"
                    src={`${serverConfig.remoteUrl}${sector.featuredImage?.path}`}
                    alt={
                      sector.featuredImage?.alt ? sector.featuredImage.alt : ''
                    }
                    width={100}
                    height={100}
                  />
                  <Typography as="p" key={sector.id} className="mb-4">
                    {sector.translation.name}
                  </Typography>
                </div>
              ))}
            </div>
          </Section>
        )}
        {result.documents.length > 0 && (
          <Section>
            <ListDocuments documents={result.documents} lang={lang} />
          </Section>
        )}
        {data?.length && data?.length > 0 && (
          <Section>
            <Typography className="py-5 pb-10" as="h3">
              Benzer ürünler
            </Typography>
            <ListProductCards lang={lang} products={data} />
          </Section>
        )}
      </Container>
    </div>
  )
}

function HeroSection({ data }: { data: ProductWithTranslation }) {
  return (
    <div>
      <Container>
        <Section>
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex items-center justify-center flex-1 border border-gray-300">
              <Image
                src={`${serverConfig.remoteUrl}/${data.featuredImage?.path}`}
                width={300}
                height={300}
                alt={data.featuredImage?.alt || ''}
              />
            </div>
            <div className="flex-[2] pb-10">
              <div className="border-b border-dashed border-gray-300 mb-5">
                <Typography
                  as="h1"
                  className="text-2xl text-gray-800 font-normal mb-1"
                >
                  {data.name}
                </Typography>
                <Typography
                  as="h3"
                  className="pb-5 text-lg text-gray-700 font-normal"
                >
                  {data.translation.productType}
                </Typography>
              </div>
              <Typography
                as="h3"
                className="pb-5 text-md text-gray-400 font-[300] leading-7"
              >
                {data.translation.metaDescription}
              </Typography>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  )
}
