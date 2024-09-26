import Typography from '@/components/ui/typography'
import { remoteUrl } from '@/config/get-env-fields'
import CollectionCard from '@/features/collections/components/collection-card'
import { SupportedLocale } from '@/i18n'

export default async function ProductSeriesSection({
  productSeries,
  lang,
}: {
  productSeries: ProductSerie[] | undefined | null | { message: string }
  lang: SupportedLocale
}) {
  if ((productSeries as WithMessageType)?.message || !productSeries) return null

  return (
    <div>
      <div className="product-series grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-5 flex-col md:flex-row flex-wrap p-2 py-10">
        {(productSeries as ProductSerie[]).map((item) => (
          <CollectionCard
            key={item.id}
            imagePath={item.featuredImage?.path || '/'}
            title={item.name}
            href={`/collections/product-series/${item.translation.slug}`}
            lang={lang}
          />
        ))}
        <div
          className="product-series-item h-[300px]"
          style={{
            backgroundImage: `url(/images/index-slides/slide-3.jpg)`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div className="product-series-item-content h-full">
            <div
              className="h-full p-5 flex items-center"
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
              }}
            >
              <Typography
                as="h3"
                className="product-series-item-title text-white text-5xl uppercase font-semibold"
              >
                DATA SHEETS
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
