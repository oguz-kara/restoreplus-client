import 'server-only'
import { getBaseMethods } from './base-methods'
import { getQuickDiscountMethods } from './v2/quick-discounts/methods'
import { getAuthMethods } from './v2/auth/methods'
import { productCategoryExtensionMethods } from './v2/product-category/extension-methods'
import { productMethods } from './v2/products/methods'
import { getCalculatedProductsMethods } from './v2/products/calculated-products-methods'
import { orderManagementMethods } from './v2/order-management/methods'
import { activeUserMethods } from './v2/active-user/methods'
import { b2bMethods } from './v2/b2b/methods'
import { dictionaryMethods } from './v2/dictionaries/methods'

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
  orderManagement: orderManagementMethods,
  activeUser: activeUserMethods,
  b2b: b2bMethods,
  facets: getBaseMethods('facets'),
  dictionaries: dictionaryMethods,
}
