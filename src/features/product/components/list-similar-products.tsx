import { ServerImage } from '@/components/ui/image'
import Typography from '@/components/ui/typography'

export default function ListSimilarProducts({
  products,
}: {
  products: ProductWithTranslation[] | null
}) {
  if (!products) return null

  return (
    <div className="grid md:grid-cols-2 gap-5 lg:gap-10">
      {products.map((product, i) => (
        <div className="flex gap-3 justify-start items-start" key={i}>
          <div className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] lg:flex-initial aspect-square">
            <ServerImage
              className="w-full h-full object-contain rounded-lg"
              src={product.featuredImage?.path || '/'}
              alt={product.featuredImage?.alt || 'product image'}
              width={200}
              height={200}
            />
          </div>
          <div className="lg:flex-initial">
            <div className="mb-2">
              <Typography className="font-bold uppercase">
                {product.name}
              </Typography>
            </div>
            <div>
              <Typography className="text-sm">
                {product.translation.productType}
              </Typography>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
