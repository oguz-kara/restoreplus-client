import AddressListPage from '@/features/user/pages/address-list-page'
import { ParamsWithLang } from '@/i18n/types'

export default function Page({ params: { lang } }: ParamsWithLang) {
  return <AddressListPage lang={lang} />
}
