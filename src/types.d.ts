interface PropsWithClassName {
  className?: string
}

interface User {
  id: number
  email: string
  password: string
  refreshToken?: string | null
  name?: string | null
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
  category?: BlogPostCategory | null
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
  blogPostCategoryId?: number | null
  featuredImage: Image | null
  user?: User | null
  blogPostCategory?: BlogPostCategoryWithOneTranslation | null
  translations: BlogPostTranslation[]
  blogPostTranslation: BlogPostTranslation
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
  blogPostCategoryTranslations: BlogPostCategoryTranslation[]
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
  imageId: number
  translations: ProductTranslation[]
  ProductDocumentation: ProductDocumentation[]
  featuredImage: Image
  createdAt: Date
  updatedAt: Date
}

interface ProductTranslation {
  id: number
  productType: string
  description: string
  baseOilType: string
  performanceFeatures: string
  certicifations: string
  industryApprovals: string
  applications: string
  benefits: string
  additionalInformation: string
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
  locale: string
  name: string
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
  blogPostCategoryTranslation: BlogPostCategoryTranslation
  blogPostCategoryInformationTranslations: BlogPostCategoryInformationTranslation[]
  blogPostCategoryInformationTranslation: BlogPostCategoryInformationTranslation
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
