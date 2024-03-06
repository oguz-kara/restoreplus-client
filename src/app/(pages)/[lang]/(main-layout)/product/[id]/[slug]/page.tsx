import SingleProductPage from '@/features/product/pages/single-product-page'
import { Locale } from '@/i18n/types'

export default function Page({
  params: { id, lang },
}: {
  params: { id: string; lang: Locale }
}) {
  return <SingleProductPage lang={lang} id={id} />
}
