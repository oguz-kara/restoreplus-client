import CreateOrderPage from '@/features/user/pages/create-order-page'
import { ParamsWithLang } from '@/i18n/types'

export default function Page({
  params: { lang, q },
}: ParamsWithLang & ParamsWithQuery) {
  return <CreateOrderPage lang={lang} q={q} />
}
