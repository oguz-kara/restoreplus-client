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
  priceSummary: {
    totalPrice: number
    totalTaxes: number
    totalPriceWithTaxes: number
    totalDiscount: number
    netTotal: number
    priceForSingleProduct: number
    netPriceForSingleProduct: number
  }
  productVariant: ProductVariant
}

export interface Order {
  id: number
  status: string
  note: null | string
  currencyCode: string
  totalDiscountPercentage: number | null
  lines: Line[]
  orders?: ActiveOrder[]
  shippingAddress?: Address
  orderPriceSummary?: {
    totalPrice: number
    totalPriceWithoutTaxes: number
    totalPriceWithTaxes: number
    totalDiscount: number
    totalTaxes: number
    netTotal: number
  }
  orderCode: string
  createdAt: Date
  updatedAt: Date
}
