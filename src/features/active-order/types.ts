interface Address {
  id: number
  title: string
  city: string
  country: string
  district: string
  state: string
  address: string
  authorizedPerson: string
}

interface FeaturedImage {
  path: string
  name: string
  alt: string
}

interface Product {
  name: string
  variantId: number
  productType: string
  featuredImage: FeaturedImage
  stockQuantity: number
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

interface OrderLine {
  id: number
  quantity: number
  product: Product
  discount: Discount
  price: Price
}

interface PriceSummary {
  totalPrice: number
  totalDiscount: number
  totalTaxes: number
  netPrice: number
}

export interface ActiveOrder {
  companyReduction: number
  id: number
  status: string
  note: string | null
  currencyCode: string
  orderCode: string
  orderCreationDate: string | null
  shippingAddress: Address
  billingAddress: Address | null
  lines: OrderLine[]
  priceSummary: PriceSummary
}
