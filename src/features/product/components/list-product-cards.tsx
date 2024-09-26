import { ServerImage } from '@/components/ui/image'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { PropsWithLang } from '@/i18n/types'

export default function ListProductCards({
  products,
  lang,
}: {
  products: Product[] | null
} & PropsWithLang) {
  if (!products) return null

  return (
    <div className="grid md:grid-cols-2 gap-5 lg:gap-10 rounded-lg">
      {products.map((product) => (
        <Link
          href={`/product/${product.translation.slug}`}
          lang={lang}
          key={product.id}
          className="bg-gray-100 rounded-lg"
        >
          <div className="flex gap-3 justify-start items-start">
            <div className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] lg:flex-initial aspect-square">
              <ServerImage
                className="w-full h-full object-contain rounded-lg"
                src={product.featuredImage?.path || '/'}
                alt={product.featuredImage?.alt || 'product image'}
                width={200}
                height={200}
              />
            </div>
            <div className="lg:flex-initial p-5">
              <div className="mb-2">
                <Typography className="font-bold uppercase">
                  {product.name}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm uppercase">
                  {product.translation.productType}
                </Typography>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
