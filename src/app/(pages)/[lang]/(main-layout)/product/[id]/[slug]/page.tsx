import { getProductById } from '@/features/product/data/get-product-by-id'
import SingleProductPage from '@/features/product/pages/single-product-page'
import { Locale } from '@/i18n/types'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = params.id
  const lang = params.lang

  const product = await getProductById(id, lang)

  return {
    title: product?.translation.metaTitle,
    description: product?.translation.metaDescription,
  }
}

export default function Page({
  params: { id, lang },
}: {
  params: { id: string; lang: Locale }
}) {
  return <SingleProductPage lang={lang} id={id} />
}
