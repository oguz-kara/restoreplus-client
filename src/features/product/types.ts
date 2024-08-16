interface FeaturedImage {
  path: string
  name: string
  alt: string
}

interface Translation {
  slug: string
  productType: string
}

interface VariantTranslation {
  id: number
  name: string
}

interface VariantDetail {
  id: number
  translation: VariantTranslation
}

interface Discount {
  reductionAmount: number
}

interface Price {
  value: number
  brutto: number
  vat: number
  currencyCode: string
}

interface Variant {
  id: number
  stockQuantity: number
  variant: VariantDetail
  translation: {
    value: string
  }
  discount: Discount
  price: Price
}

export interface CalculatedProduct {
  id: number
  name: string
  featuredImage: FeaturedImage
  translation: Translation
  currencyCode: string
  reductionValue: number
  variants: Variant[]
}
