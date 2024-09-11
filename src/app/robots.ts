import { serverUrl } from '@/config/get-env-fields'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/login',
        '/register',
        '/partner-register',
        '/about',
        '/blog',
        '/categories',
        '/contact',
        '/create-order',
        '/offer',
        '/privacy',
        '/product/finder',
        '/sectors',
        '/terms-and-conditions',
      ],
      disallow: [
        '/b2b-register-request-sent',
        '/b2b-registration',
        '/order-creation-result',
        '/verify-email-success',
        '/checkout',
        '/profile',
        '/profile/addresses',
        '/profile/company',
        '/profile/orders',
        '/profile/orders/cancelled',
        '/profile/orders/not-shipped',
      ],
    },
    sitemap: `${serverUrl}/sitemap.xml`,
  }
}
