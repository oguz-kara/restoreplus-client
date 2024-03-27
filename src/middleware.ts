import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from 'next/server'
import i18n from './i18n'

const protectedRoutes = ['/profile']

function getLocale(request: NextRequest) {
  const languageHeader = request.headers.get('accept-language')
  const headers = {
    'accept-language': languageHeader
      ? languageHeader
      : i18n.defaultAcceptLanguage,
  }

  const locales = i18n.locales

  const languages = new Negotiator({ headers }).languages()

  const locale = matchLocale(languages, locales, i18n.defaultLocale)

  return locale
}

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('jwt')
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname)

  if (!isAuthenticated && isProtectedRoute) {
    const absoluteUrl = new URL('/login', request.nextUrl.origin)
    console.log({ absoluteUrl: absoluteUrl.toString() })
    return NextResponse.redirect(absoluteUrl.toString())
  }

  const { pathname } = request.nextUrl
  const locale = getLocale(request)
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (locale === i18n.defaultLocale && pathnameIsMissingLocale)
    return NextResponse.rewrite(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
}
