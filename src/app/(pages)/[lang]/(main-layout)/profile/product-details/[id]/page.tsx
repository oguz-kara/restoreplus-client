import ProductDetailsPage from '@/features/product/pages/calculated-product-details-page'
import { ParamsWithLang } from '@/i18n/types'
import React from 'react'

export default function page({
  params: { id, lang },
}: { params: { id: number } } & ParamsWithLang) {
  return (
    <div>
      <ProductDetailsPage lang={lang} id={id} />
    </div>
  )
}
