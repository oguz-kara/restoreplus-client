import serverConfig from '@/config/server-config.json'
import Typography from '@/components/ui/typography'
import { getCalculatedProductForCompany } from '../data/get-products'
import Image from '@/components/ui/image'
import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import { formatPrice } from '@/utils/format-price'
import { getProperLanguage } from '@/i18n/utils'

export default async function ProductDetailsPage({
  id,
  lang,
}: { id: number } & PropsWithLang) {
  const {
    profile: {
      products: { details },
    },
    common: { price },
  } = await getDictionary(lang)
  if (!id) 'No product found!'

  const properLang = getProperLanguage(lang)

  const product = await getCalculatedProductForCompany(properLang, id)

  if (!product) return <Typography as="h5">Product not found!</Typography>

  return (
    <div className="flex flex-col gap-2">
      {/* name */}
      <Typography as="h4">{product.name}</Typography>
      {/* image */}
      <div className="flex gap-10">
        <Image
          className="!w-full !h-auto md:w-[200px] md:h[150px] object-cover flex-1"
          src={`${serverConfig.remoteUrl}/${product.featuredImage?.path}`}
          width={300}
          height={300}
          alt={product.featuredImage?.alt ? product.featuredImage.alt : 'image'}
          style={{
            maxWidth: '400px',
          }}
        />
        <Typography as="p" className="flex-1">
          {product.description}
        </Typography>
      </div>
      {/* price */}
      <div>
        <Typography as="p" className="flex items-center gap-2">
          <span className="text-xs">{price}:</span>{' '}
          {formatPrice(product.price, 'TRY')}
        </Typography>
      </div>
    </div>
  )
}

async function getSingleCalculatedProductById(id: number) {}
