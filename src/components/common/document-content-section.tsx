import React from 'react'
import Section from './section'
import Typography from '../ui/typography'
import { cn } from '@/lib/utils'
import Link from '../ui/link'
import { SupportedLocale } from '@/i18n'
import MdxRenderer from './mdx-renderer'
import ListProductCards from '@/features/product/components/list-product-cards'

interface DocumentContentSectionProps {
  mainContent: ApplicationScope | ProductCategory
  listOfOtherContent: ApplicationScope[] | ProductCategory[]
  products: Product[]
  lang: SupportedLocale
  content: {
    sidebarTitle: string
    discoverProductsText: string
  }
  path?: string
}

export default function DocumentContentSection({
  mainContent,
  listOfOtherContent,
  products,
  path,
  lang,
  content,
}: DocumentContentSectionProps) {
  return (
    <Section>
      <div className="flex gap-10 ">
        <div className="hidden flex-1 lg:block rounded-sm">
          {listOfOtherContent && listOfOtherContent.length > 0 && (
            <div className="bg-gray-50 md:p-5">
              <div>
                <Typography className="p-2 text-2xl mb-5 uppercase">
                  {content.sidebarTitle}
                </Typography>
              </div>
              <ul>
                {listOfOtherContent?.map((scope) => (
                  <li
                    className={cn(
                      'hover:bg-secondary border-b-gray-300 border-solid border-b p-3'
                    )}
                    key={scope?.id}
                  >
                    <Link
                      className="flex items-center justify-between"
                      lang={lang}
                      href={`/product/categories/${scope.translation.slug}`}
                    >
                      <div>
                        <Typography className="capitalize">
                          {scope.translation.name}
                        </Typography>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex-[3]">
          <MdxRenderer
            mdxText={mainContent?.translation?.description as string}
          />
          {products && products.length > 0 ? (
            <div className="pb-10">
              <div className="py-10">
                <Typography as="h6" className="text-xl font-semibold">
                  {lang === 'tr' && (
                    <span className="capitalize">
                      {mainContent?.translation.name}
                      {` `}
                    </span>
                  )}
                  {content.discoverProductsText}
                  {(!lang || lang === 'en') && (
                    <span className="capitalize">
                      {` `}
                      {mainContent?.translation.name}
                    </span>
                  )}
                </Typography>
              </div>
              <ListProductCards lang={lang} products={products} path={path} />
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  )
}
