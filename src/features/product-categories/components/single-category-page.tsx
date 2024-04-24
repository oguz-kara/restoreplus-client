import Container from '@/components/common/container'
import Section from '@/components/common/section'
import { Locale } from '@/i18n/types'
import React from 'react'
import Typography from '@/components/ui/typography'
import serverConfig from '@/config/server-config.json'
import MdxRenderer from '@/components/common/mdx-renderer'
import ListProductCards from '@/features/product/components/list-product-cards'
import { getDictionary } from '@/i18n/get-dictionary'
import { getCategoryById } from '../data/get-category-by-id'
import { getProductsByCategoryId } from '@/features/product/data/get-products-by-category-id'
import { getAllCategories } from '../data/get-all-categories'
import Link from '@/components/ui/link'
import HighligtedHeader from '@/components/common/highligted-header'

type PageProps = {
  lang: Locale
  id: string
  slug: string
}

export default async function SingleCategoryPage({
  id,
  slug,
  lang,
}: PageProps) {
  const category = await getCategoryById(id, lang)
  const productData = await getProductsByCategoryId({
    lang,
    id: Number(id),
  })
  const categoryData = await getAllCategories(lang)

  const {
    applicationScope: {
      page: { productsTitle },
    },
    productCategories: {
      page: { categoriesTitle },
    },
  } = await getDictionary(lang)

  return (
    <div>
      <HeroSection data={category as ProductCategoryWithTranslation} />
      <Container>
        <Section>
          <div className="flex gap-10">
            <div className="hidden flex-1 lg:block">
              <div>
                <HighligtedHeader>{categoriesTitle}</HighligtedHeader>
              </div>
              {categoryData.data.map((item) => (
                <div key={item?.id}>
                  <Link
                    lang={lang}
                    href={`/product/categories/${item.id}/${item.translation.slug}`}
                  >
                    <Typography className="capitalize">
                      {item.translation.name}
                    </Typography>
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex-[3]">
              <MdxRenderer
                mdxText={category?.translation?.description as string}
              />
              <div>
                {productData && productData.data.length > 0 ? (
                  <>
                    <div className="py-10">
                      <Typography as="h6" className="text-xl font-semibold">
                        {lang === 'tr' && (
                          <span className="capitalize">
                            {category?.translation.name}
                            {` `}
                          </span>
                        )}
                        {productsTitle}
                        {(!lang || lang === 'en') && (
                          <span className="capitalize">
                            {` `}
                            {category?.translation.name}
                          </span>
                        )}
                      </Typography>
                    </div>

                    <ListProductCards lang={lang} products={productData.data} />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  )
}

function HeroSection({ data }: { data: ProductCategoryWithTranslation }) {
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
