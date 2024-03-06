import React from 'react'
import serverConfig from '@/config/server-config.json'
import { getProducts } from '../data/get-products'
import Image from '@/components/ui/image'
import Typography from '@/components/ui/typography'
import Link from '@/components/ui/link'
import { PropsWithLang } from '@/i18n/types'

export default async function ListProductsMain({ lang }: PropsWithLang) {
  const res = await getProducts()

  if (!res) return 'no data found!'

  const { data } = res

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
      {data.map((item, i) => (
        <ProductCard key={i} product={item} lang={lang} />
      ))}
    </div>
  )
}

function ProductCard({
  product,
  lang,
}: { product: ProductWithTranslation } & PropsWithLang) {
  return (
    <Link
      href={`/product/${product.id}/${product.translation.slug}`}
      lang={lang}
    >
      <div className="flex gap-5 flex-col items-center text-center border border-gray-300 p-5 mb-5">
        <div>
          <Typography as="h5" className="font-[500] text-md">
            {product.name}
          </Typography>
        </div>
        <div>
          <Image
            className="h-[150px] object-cover"
            src={`${serverConfig.remoteUrl}/${product.featuredImage?.path}`}
            width={500}
            height={500}
            alt={
              product.featuredImage?.alt ? product.featuredImage.alt : 'image'
            }
          />
        </div>
      </div>
    </Link>
  )
}
