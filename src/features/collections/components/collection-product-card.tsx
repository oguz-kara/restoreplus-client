import { Button } from '@/components/ui/button'
import { ServerImage } from '@/components/ui/image'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { getDictionary } from '@/i18n/get-dictionary'
import { Locale } from '@/i18n/types'
import React from 'react'

export default async function CollectionProductCard({
  product,
  lang,
}: {
  product: Product
  lang: Locale
}) {
  const dict = await getDictionary(lang)

  return (
    <Link
      className="block"
      href={`/product/${product.translation.slug}`}
      lang={lang}
    >
      <div className="flex items-center flex-col p-5 bg-white rounded-lg text-center h-full">
        <div className="flex-1 mb-5">
          <ServerImage
            className="w-full max-h-[300px] max-w-[300px] object-contain rounded-lg"
            src={product.featuredImage?.path || '/'}
            width={500}
            height={500}
            alt={product.featuredImage?.alt || 'restoreplus product image'}
          />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div>
            <Typography as="h4" className="text-2xl mb-5 uppercase">
              {product.name}
            </Typography>
            <Typography className="mb-5">
              {product.translation.metaDescription.slice(0, 100).concat('...')}
            </Typography>
          </div>
          <Button size="lg" className="rounded-lg">
            {dict.product_finder.see_details_tooltip}
          </Button>
        </div>
      </div>
    </Link>
  )
}
