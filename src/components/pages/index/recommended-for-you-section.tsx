import { Button } from '@/components/ui/button'
import { ServerImage } from '@/components/ui/image'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'
import React from 'react'

export default async function RecommendedForYouSection({
  lang,
}: PropsWithLang) {
  const dict = await getDictionary(lang)

  const { data: products } = await sdk.products.getAllByQuery(
    { take: 4 },
    { lang }
  )

  return (
    <section>
      <Typography
        className="text-4xl md:text-5xl lg:text-6xl font-semibold py-5 px-2 uppercase"
        as="h2"
      >
        {dict.index.recommended_for_you_text}
      </Typography>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-y-20  p-3">
        {products.map((product: Product, i: number) => (
          <div
            key={product.id}
            className="px-8 py-4 bg-white flex flex-col-reverse lg:flex-row min-h-[250px] rounded-sm"
            style={{
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            }}
          >
            <div className="flex-1 ">
              <Typography
                as="h4"
                className="text-2xl font-semibold text-primary uppercase"
              >{`${product.name}`}</Typography>
              <Typography
                as="h5"
                className="text-md font-semibold mb-2 uppercase"
              >{`${product.translation.productType}`}</Typography>
              <Typography as="p" className="mb-7">
                {product.translation.metaDescription}
              </Typography>
              <Link href={`/product/${product.translation.slug}`} lang={lang}>
                <Button variant="bright-accent" size="lg">
                  {dict.product_finder.see_details_tooltip}
                </Button>
              </Link>
            </div>
            <div className="flex-1 relative">
              <div className="relative lg:absolute lg:top-[-200px] lg:right-[-100px]">
                <div className="lg:w-[500px] lg:h-[500px]">
                  <ServerImage
                    className="w-full h-full object-contain"
                    src={product.featuredImage?.path || ''}
                    alt={
                      product.featuredImage?.alt || 'restoreplus product image'
                    }
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
