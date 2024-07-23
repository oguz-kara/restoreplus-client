import SingleProductPage from '@/features/product/pages/single-product-page'
import { Locale } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = params.id
  const lang = params.lang

  const product = await sdk.products.getById(Number(id), { lang })

  return {
    title: product?.translation?.metaTitle,
    description: product?.translation?.metaDescription,
  }
}

export default function Page({
  params: { id, lang },
  searchParams: { redirectBack },
}: {
  params: { id: string; lang: Locale }
  searchParams: { redirectBack?: string }
}) {
  return (
    <SingleProductPage
      lang={lang}
      id={id}
      redirectBackSearchParam={redirectBack}
    />
  )
}
