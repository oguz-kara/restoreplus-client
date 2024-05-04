interface PropsWithClassName {
  className?: string
}

interface User {
  id: number
  email: string
  password: string
  refreshToken?: string | null
  name?: string | null
  firstName?: string | null
  lastName?: string | null
  role?: string | null
  posts: BlogPost[]
  createdAt: Date
  updatedAt: Date
}

interface Pagination {
  page: string
  take: string
  total?: number
}

interface BlogPost {
  id: number
  authorName: string
  minsRead?: number | null
  userId?: number | null
  imageId?: number | null
  blogPostCategoryId?: number | null
  featuredImage: Image | null
  user?: User | null
  categories?: BlogPostCategory[] | null
  translations: BlogPostTranslation[]
  createdAt: Date
  updatedAt: Date
}

interface BlogPostWithOneTranslation {
  id: number
  authorName: string
  minsRead?: number | null
  userId?: number | null
  imageId?: number | null
  featuredImage: Image | null
  user?: User | null
  categories?: BlogPostCategoryWithOneTranslation[] | null
  translation: BlogPostTranslation
  createdAt: Date
  updatedAt: Date
}

interface BlogPostTranslation {
  id: number
  slug: string
  title: string
  content: string
  excerpt?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  keywords?: string | null
  tags?: string | null
  blogPostId?: number | null
  supportedLocaleId: number
  BlogPost?: BlogPost | null
  locale: SupportedLocale
  createdAt: Date
  updatedAt: Date
}

interface BlogPostCategory {
  id: number
  isTopLevelCategory?: boolean | null
  parentCategoryId?: number | null
  parentCategory?: BlogPostCategory | null
  posts: BlogPost[]
  subCategories: BlogPostCategory[]
  translations: BlogPostCategoryTranslation[]
  blogPostCategoryInformationTranslations: BlogPostCategoryInformationTranslation[]
  featuredImage: Image | null
  createdAt: Date
  updatedAt: Date
}

interface QuoteRequest {
  id: number
  firstName: string
  lastName: string
  emailAddress: string
  phoneNumber: string
  company: string
  companyAddress: string
  city: string
  country: string
  postalCode: string
  message: string
  companyTitle?: string | null
  status?: string | null
  createdAt: Date
  updatedAt: Date
}

interface BlogPostCategoryTranslation {
  id: number
  name: string
  slug: string
  description?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  keywords?: string | null
  supportedLocaleId: number
  blogPostCategoryId?: number | null
  imageId?: number | null
  featuredImage?: Image | null
  locale: SupportedLocale
  blogPostCategory?: BlogPostCategory | null
  createdAt: Date
  updatedAt: Date
}

interface Image {
  id: number
  originalName: string
  name: string
  alt: string
  mimeType: string
  size: number
  path: string
  width: number
  height: number
  checksum?: string | null
  metadata?: string
  createdAt: Date
  updatedAt: Date
  blogPostCategoryTranslation: BlogPostCategoryTranslation[]
  blogPost: BlogPost[]
  blogPostCategory: BlogPostCategory[]
}

interface Price {
  id: number
  amount: number
  currency?: Currency | null
  currencyId?: number | null
  createdAt: Date
  updatedAt: Date
}

interface Currency {
  id: number
  currencyCode: string
  currencyName: string
  prices: Price[]
  baseExchangeRate: ExchangeRate[]
  targetExchangeRate: ExchangeRate[]
  createdAt: Date
  updatedAt: Date
}

interface ExchangeRate {
  id: number
  baseCurrencyId: number
  targetCurrencyId: number
  rate: number
  date: Date
  baseCurrency: Currency
  targetCurrency: Currency
  createdAt: Date
  updatedAt: Date
}

interface Product {
  id: number
  name: string
  imageId?: number | null
  translations: ProductTranslation[]
  documents: Document[]
  categories: ProductCategory[]
  featuredImage?: Image | null
  sectors: Sector[]
  createdAt: Date
  updatedAt: Date
}

interface TranslatedProduct {
  slug: string
  metaTitle: string
  metaDescription: string
  productType: string
  description: string
  supportedLocaleId: number
  productId: number
  locale: SupportedLocale
  product: Product
  equivalents?: string
  id: number
  name: string
  imageId?: number | null
  ProductDocumentation: ProductDocumentation[]
  categories: ProductCategory[]
  featuredImage?: Image | null
  sectors: Sector[]
  createdAt: Date
  updatedAt: Date
}

interface ProductTranslation {
  id: number
  slug: string
  metaTitle: string
  metaDescription: string
  productType: string
  description: string
  equivalents?: string
  supportedLocaleId: number
  productId: number
  locale: SupportedLocale
  product: Product
  createdAt: Date
  updatedAt: Date
}

interface ProductDocumentation {
  id: number
  name: string
  productId: number
  supportedLocaleId: number
  fileId: number
  product: Product
  locale: SupportedLocale
  file: File
  createdAt: Date
  updatedAt: Date
}

interface File {
  id: number
  name: string
  mimeType: string
  size: number
  path: string
  checksum?: string | null
  createdAt: Date
  updatedAt: Date
  ProductDocumentation: ProductDocumentation[]
}

interface SupportedLocale {
  id: number
  createdAt: Date
  updatedAt: Date
}

interface BlogPostCategoryInformationTranslation {
  id: number
  info: string
  functions: string
  whatAre: string
  faq: string
  useCases: string
  maintenanceandStorageConditions: string
  applicationMethods: string
  footerInfo: string
  blogPostCategoryId?: number | null
  supportedLocaleId: number
  blogPostCategory?: BlogPostCategory | null
  locale: SupportedLocale
  createdAt: Date
  updatedAt: Date
}

interface SupportedLocale {
  id: number
  locale: Locale
  name: 'tr' | 'en'
  default: boolean
  createdAt: Date
  updatedAt: Date
  blogPostCategoryInformationTranslation: BlogPostCategoryInformationTranslation[]
  blogPostCategoryTranslation: BlogPostCategoryTranslation[]
  BlogPostTranslation: BlogPostTranslation[]
}

interface BlogPostCategoryWithOneTranslation {
  id: number
  isTopLevelCategory?: boolean | null
  parentCategoryId?: number | null
  parentCategory?: BlogPostCategory | null
  posts: BlogPost[]
  subCategories: BlogPostCategoryWithOneTranslation[]
  translation: BlogPostCategoryTranslation
  informationTranslations?: BlogPostCategoryInformationTranslation[]
  informationTranslation?: BlogPostCategoryInformationTranslation
  featuredImage: Image | null
  createdAt: Date
  updatedAt: Date
}

interface CategoryData {
  data: BlogPostCategoryWithOneTranslation[]
  pagination: Pagination
}

interface ParamsWithId {
  params: {
    id: string
  }
}
interface ParamsWithSlug {
  params: {
    slug: string
  }
}

interface Sector {
  id: number
  featuredImageId?: number | null
  featuredImage?: Image | null
  products: Product[]
  translations: SectorTranslation[]
  createdAt: Date
  updatedAt: Date
}

interface SectorWithTranslation {
  id: number
  featuredImageId?: number | null
  featuredImage?: Image | null
  products: Product[]
  translation: SectorTranslation
  applicationScopes?: ApplicationScopeWithTranslation[]
  createdAt: Date
  updatedAt: Date
}

interface ApplicationScope {
  id: number
  featuredImageId?: number | null
  sectorId?: number | null
  featuredImage?: Image | null
  productGroups: ProductGroup[]
  translations: ApplicationScopeTranslation[]
  sector?: Sector | null
  createdAt: Date
  updatedAt: Date
}

interface ApplicationScopeTranslation {
  id: number
  name: string
  slug: string
  metaTitle?: string
  metaDescription?: string
  description?: string | null
  resourceId?: number | null
  supportedLocaleId: number
  locale: SupportedLocale
  createdAt: Date
  updatedAt: Date
  resource?: ApplicationScope | null
}

interface ApplicationScopeWithTranslation {
  id: number
  featuredImageId?: number | null
  sectorId?: number | null
  featuredImage?: Image | null
  productGroups: ProductGroup[]
  translation: ApplicationScopeTranslation
  sector?: Sector | null
  createdAt: Date
  updatedAt: Date
}

interface SectorTranslation {
  id: number
  slug: string
  name: string
  title: string
  metaTitle: string
  metaDescription: string
  description?: string | null
  content: string
  sectorId: number
  localeId: number
  sector: Sector
  locale: SupportedLocale
  createdAt: Date
  updatedAt: Date
}

interface SectorWithTranslation {
  id: number
  featuredImageId?: number | null
  featuredImage?: Image | null
  products: Product[]
  translations: SectorTranslation[]
  translation: SectorTranslation
  createdAt: Date
  updatedAt: Date
}

interface ProductWithTranslation {
  id: number
  name: string
  imageId?: number | null
  equivalents?: string
  translations: ProductTranslation[]
  translation: ProductTranslation
  productDocumentation: ProductDocumentation[]
  categories: TranslatedProductCategory[]
  featuredImage?: Image | null
  sectors: SectorWithTranslation[]
  documents: DocumentWithTranslation[]
  createdAt: Date
  updatedAt: Date
}

interface Address {
  id: number
  title: string
  authorizedPerson: string
  street1: string
  street2?: string | null
  city: string
  state?: string | null
  district: string
  phone: string
  postalCode?: string | null
  country: string
  createdAt: Date
  updatedAt: Date
  company?: Company | null
  companyId?: number | null
}

interface Company {
  id: number
  name: string
  description?: string
  website?: string
  phoneNumber?: string
  addressList: Address[]
  user: User[]
  createdAt: Date
  updatedAt: Date
}

interface ActiveUser {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  company?: Company
  addressList?: Address[]
  orders?: ActiveOrder[]
}

interface CalculatedProduct {
  id: number
  slug: string
  name: string
  metaTitle: string
  metaDescription: string
  productType: string
  description: string
  supportedLocaleId: number
  equivalents?: string
  productGroupId: number | null
  featuredImage: Image
  price: number
  totalDiscount: number
  calculatedPrice: number
  currencyCode: string
  sectorsDiscounts: SectorDiscount[]
  reductionDiscounts: ReductionDiscounts
  sectors: TranslatedSector[]
  variants: any
}

interface SectorDiscount {
  sectorName: string
  type: string
  value: number
}

interface ReductionDiscounts {
  type: string
  value: string
}

interface TranslatedSector {
  id: number
  slug: string
  name: string
  title: string
  metaTitle: string
  metaDescription: string
  description: string
  content: string
  resourceId: number
  createdAt: string
  updatedAt: string
  isTopLevelSector: boolean
  featuredImageId: number
  parentSectorId: number | null
}

interface PropsWithPagination {
  page?: string
  take?: string
}

interface ParamsWithPagination {
  params: PropsWithPagination
}

interface ParamsWithQuery {
  params: {
    q?: string
  }
}

interface ProductCategoryTranslation {
  id: number
  name: string
  slug: string
  description?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  keywords?: string | null
  supportedLocaleId: number
  resourceId?: number | null
  imageId?: number | null
  featuredImage?: Image | null
  locale: SupportedLocale
  resource?: ProductCategory | null
  createdAt: Date
  updatedAt: Date
}

interface ProductCategory {
  id: number
  isTopLevelCategory?: boolean | null
  imageId?: number | null
  featuredImage?: Image | null
  subCategories: ProductCategory[]
  parentCategories: ProductCategory[]
  products: Product[]
  translations: ProductCategoryTranslation[]
  createdAt: Date
  updatedAt: Date
}

interface ProductCategoryWithTranslation {
  id: number
  isTopLevelCategory?: boolean | null
  imageId?: number | null
  featuredImage?: Image | null
  subCategories: ProductCategory[]
  parentCategories: ProductCategory[]
  products: Product[]
  translation: ProductCategoryTranslation
  createdAt: Date
  updatedAt: Date
}

interface TranslatedSector {
  id: number
  featuredImageId?: number | null
  featuredImage?: Image | null
  products: Product[]
  translation: SectorTranslation
  createdAt: Date
  updatedAt: Date
}

interface TranslatedProductCategory {
  name: string
  slug: string
  description?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  keywords?: string | null
  supportedLocaleId: number
  resourceId?: number | null
  resource?: ProductCategory | null
  id: number
  isTopLevelCategory?: boolean | null
  parentCategoryId?: number | null
  imageId?: number | null
  featuredImage?: Image | null
  parentCategory?: ProductCategory | null
  subCategories: TranslatedProductCategory[] | ProductCategory[]
  products: Product[]
  createdAt: Date
  updatedAt: Date
}

interface Document {
  id: number
  documentCategoryId?: number | null
  productId?: number | null
  translations: DocumentTranslation[]
  documentCategory?: DocumentCategory | null
  product?: Product | null
  createdAt: Date
  updatedAt: Date
}

interface DocumentWithTranslation {
  id: number
  documentCategoryId?: number | null
  productId?: number | null
  translation: DocumentTranslation
  documentCategory?: DocumentCategory | null
  product?: Product | null
  createdAt: Date
  updatedAt: Date
}

interface DocumentTranslation {
  id: number
  name: string
  description?: string | null
  resourceId: number
  localeId: number
  fileId: number
  createdAt: Date
  updatedAt: Date
  locale: SupportedLocale
  file: File
  resource: Document
}

interface DocumentCategory {
  id: number
  createdAt: Date
  updatedAt: Date
  documents: Document[]
  translations: DocumentCategoryTranslation[]
}

interface DocumentCategoryWithTranslation {
  id: number
  documents: Document[]
  translation: DocumentCategoryTranslation
  createdAt: Date
  updatedAt: Date
}

interface DocumentCategoryTranslation {
  id: number
  name: string
  resourceId: number
  localeId: number
  locale: SupportedLocale
  resource: DocumentCategory
  createdAt: Date
  updatedAt: Date
}

interface ProductVariant {
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

interface Line {
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

interface ActiveOrder {
  id: number
  status: string
  note: null | string
  currencyCode: string
  totalDiscountPercentage: number | null
  lines: Line[]
  orderPriceSummary?: {
    totalPrice: number
    totalPriceWithoutTaxes: number
    totalPriceWithTaxes: number
    totalDiscount: number
    netTotal: number
  }
  shippingAddress?: Address
  orderCode: string
  createdAt: Date
  updatedAt: Date
}
