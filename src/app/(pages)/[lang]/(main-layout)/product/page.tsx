import ListProductsPage from '@/features/product/pages/list-products-page'
import { ParamsWithLang } from '@/i18n/types'

export default function Page({ params: { lang } }: ParamsWithLang) {
  return <ListProductsPage lang={lang} />
}
