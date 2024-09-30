import { Button } from '@/components/ui/button'
import { ServerImage } from '@/components/ui/image'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import { ArrowRight } from 'lucide-react'

interface ListProductCardsProps {
  products: Product[] | null
  path?: string
}

export default async function ListProductCards({
  products,
  path,
  lang,
}: ListProductCardsProps & PropsWithLang) {
  const dict = await getDictionary(lang)

  if (!products) return null

  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-5 rounded-lg">
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
      {path && products.length >= 4 && (
        <div className="py-5">
          <Link href={`${path}`} lang={lang}>
            <Button variant="default">
              <span className="mr-1">{dict.common.see_all_text}</span>
              <span>
                <ArrowRight />
              </span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
