import ListCategoriesPage from '@/features/categories/pages/list-categories-page'
import { ParamsWithLang } from '@/i18n/types'

export default function Page({ params: { lang } }: ParamsWithLang) {
  return <ListCategoriesPage lang={lang} />
}
