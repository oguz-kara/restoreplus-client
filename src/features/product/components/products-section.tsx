import React from 'react'
import { PropsWithLang } from '@/i18n/types'
import Section from '@/components/common/section'
import { ServerImage } from '@/components/ui/image'
import Typography from '@/components/ui/typography'
import { getDictionary } from '@/i18n/get-dictionary'
import Container from '@/components/common/container'
import Link from '@/components/ui/link'
import SectionHeader from '@/components/common/section-header'
import bg from '../../../../public/images/hero-image.png'
import { sdk } from '@/restoreplus-sdk'

export default async function ProductsSection({ lang }: PropsWithLang) {
  const dict = await getDictionary(lang)
  const productData = await sdk.products.getAllByQuery({ take: 10 }, { lang })

  if (!productData?.data) return null

  return (
    <div
      className="bg-foreground py-10 text-white"
      style={{
        background: `url(${bg.src})`,
        minHeight: '500px',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Container className="max-w-[1024px]">
        <Section>
          <div className="pb-3">
            <SectionHeader className="text-center">{dict.common.our_products_text}</SectionHeader>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 auto-rows-fr">
            {productData.data.map((product: Product, i: number) => (
              <Link
                href={`/product/${product.translation.slug}`}
                lang={lang}
                key={i}
              >
                <div>
                  <div className="p-3 bg-white mb-2">
                    <ServerImage
                      className="object-contain w-full aspect-square"
                      src={product.featuredImage?.path || ''}
                      alt={product.featuredImage?.alt || ''}
                      width={300}
                      height={300}
                    />
                  </div>
                  <div>
                    <Typography
                      as="p"
                      className="text-sm lg:text-md text-center whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {product.name}
                    </Typography>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </Container>
    </div>
  )
}
