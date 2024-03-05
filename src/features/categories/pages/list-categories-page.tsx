import {  PropsWithLang } from '@/i18n/types'
import ListCategories from '../components/list-categories'

export default function ListCategoriesPage({lang}: PropsWithLang) {
  return (
    <div>
      <ListCategories lang={lang} />
    </div>
  )
}
