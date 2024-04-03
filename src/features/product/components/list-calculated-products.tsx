import { PropsWithLang } from '@/i18n/types'
import CalculatedProductCard from './calculated-product-card'

interface ListCalculatedProductsProps {
  products: CalculatedProduct[]
}

export default function ListCalculatedProducts({
  products,
  lang,
}: ListCalculatedProductsProps & PropsWithLang) {
  if (!products) 'No data found'

  return (
    <div className="grid grid-cols-3">
      {products?.map((item, i) => (
        <CalculatedProductCard key={i} product={item} lang={lang} />
      ))}
    </div>
  )
}
