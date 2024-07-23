import 'server-only'
import { getBaseMethods } from './base-methods'
import { getQuickDiscountMethods } from './v2/quick-discounts/methods'
import { getAuthMethods } from './v2/auth/methods'
import { productCategoryExtensionMethods } from './v2/product-category/extension-methods'
import { productMethods } from './v2/products/methods'
import { getCalculatedProductsMethods } from './v2/products/calculated-products-methods'

export const restorePlusSdk = {
  applicationScopes: getBaseMethods('application-scopes'),
  sectors: getBaseMethods('sectors'),
  products: productMethods,
  calculatedProducts: getCalculatedProductsMethods('calculated-products'),
  productCategories: getBaseMethods('products/categories'),
  productCategoriesExtensions: productCategoryExtensionMethods,
  quoteRequests: getBaseMethods('quote-requests'),
  blogPosts: getBaseMethods('blog-posts'),
  blogPostCategories: getBaseMethods('blog-posts/categories'),
  discountCoupons: getBaseMethods('discount-coupons'),
  reductions: getBaseMethods('reductions'),
  quickDiscounts: getQuickDiscountMethods('quick-discounts'),
  orderLimits: getBaseMethods('order-limits'),
  seoPages: getBaseMethods('seo-pages'),
  supportedLocales: getBaseMethods('supported-locales'),
  currencies: getBaseMethods('currencies'),
  variants: getBaseMethods('variants'),
  documents: getBaseMethods('documents'),
  auth: getAuthMethods(),
}
