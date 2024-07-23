import React from 'react'
import serverConfig from '@/config/server-config.json'
import Image from '@/components/ui/image'
import Typography from '@/components/ui/typography'
import Link from '@/components/ui/link'
import { PropsWithLang } from '@/i18n/types'
import { getDictionary } from '@/i18n/get-dictionary'
import { advancedDataSearch } from '@/utils/fetch-data'

interface ListProductsMainProps extends Pagination {
  q?: string
  type: string
}

export default async function ListProductsMain({
  lang,
  page,
  take,
  q,
  type,
}: PropsWithLang & ListProductsMainProps) {
  const {
    publicProductPageList: { available, products },
  } = await getDictionary(lang)
  const { data, pagination } = await advancedDataSearch({
    page,
    take,
    name: 'products',
    type: 'search',
    query: q,
  })

  if (!data) return 'no data found!'

  return (
    <div>
      <div className="mb-5">
        <Typography>{products}</Typography>
        <Typography>
          ({pagination?.total} {available})
        </Typography>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
        {data.map((item: any, i: number) => (
          <ProductCard key={i} product={item} lang={lang} />
        ))}
      </div>
    </div>
  )
}

function ProductCard({
  product,
  lang,
}: { product: ProductCategory } & PropsWithLang) {
  return (
    <Link
      href={`/product/${product.id}/${product.translation.slug}`}
      lang={lang}
    >
      <div className="flex gap-5 flex-col items-center text-center border border-gray-300 p-5 mb-5 h-[264px]">
        <div>
          <Typography as="h5" className="font-[500] text-md">
            {product.name}
          </Typography>
        </div>
        <div>
          <Image
            className="h-[150px] object-contain"
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
