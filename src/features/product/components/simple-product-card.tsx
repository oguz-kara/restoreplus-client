import { ServerImage } from '@/components/ui/image'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { PropsWithLang } from '@/i18n/types'

export default function SimpleProductCard({
  product,
  lang,
  ...rest
}: { product: Product } & PropsWithLang & PropsWithClassName) {
  return (
    <Link
      href={`/product/${product.id}/${product.translation.slug}`}
      lang={lang}
      {...rest}
    >
      <div>
        <div className="p-3 bg-white mb-2 rounded-lg">
          <ServerImage
            className="object-contain w-full aspect-square rounded-lg"
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
  )
}
