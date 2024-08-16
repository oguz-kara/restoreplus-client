import B2bRegistrationPage from '@/features/b2b/pages/b2b-registration-page'
import { ParamsWithLang } from '@/i18n/types'

export default function Page({
  params: { lang },
  searchParams: { token },
}: ParamsWithLang & { searchParams: { token: string } }) {
  return <B2bRegistrationPage lang={lang} token={token} />
}
