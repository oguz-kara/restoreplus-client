import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from '@/components/ui/image'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import serverConfig from '@/config/server-config.json'
import { PropsWithLang } from '@/i18n/types'

interface CalculatedProductCardProps {
  product: CalculatedProduct
}

export default function CalculatedProductCard({
  product,
  lang,
}: CalculatedProductCardProps & PropsWithLang) {
  return (
    <Link href={`/profile/product-details/${product.id}`} lang={lang}>
      <Card className="p-0 relative">
        <div className="absolute top-[-5px] left-[-5px]">
          <Badge>{product.totalDiscount}%</Badge>
        </div>
        <CardHeader>
          <Image
            src={`${serverConfig.remoteUrl}/${product.featuredImage?.path}`}
            width={500}
            height={500}
            alt={product.featuredImage.alt}
          />
        </CardHeader>
        <CardContent>
          <Typography as="h6">{product.name}</Typography>
          <Typography
            as="p"
            className="line-through text-gray-400 text-sm py-1"
          >
            ${product.price}
          </Typography>
          <Typography as="p" className="font-semibold">
            ${product.calculatedPrice}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
