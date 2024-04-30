export interface ProductVariant {
  id: number
  featuredImage: {
    path: string
    name: string
    alt: string
  } | null
  productType: string
  stockQuantity: number
  name: string
  value: string
  price: {
    amount: number
    baseCurrency: string
  }
}

export interface Line {
  id: number
  quantity: number
  price: number
  productVariant: ProductVariant
}

export interface Order {
  id: number
  status: string
  note: null | string
  currencyCode: string
  lines: Line[]
}
