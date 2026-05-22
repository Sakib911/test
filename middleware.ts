import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'

import { locales } from './lib/i18n-config'

// If you want to re-enable authentication later, import your helpers here:
// import {
//   getSessionToken,
//   getUserProfileFromAPI,
//   isAdminRoute,
// } from './lib/authUtils'
// import { ACCESS_TOKEN, REFRESH_TOKEN } from './lib/Constants'

// --- i18n middleware setup ---
const i18nMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: true,
})

// --- helpers ---
function extractLocaleAndPathname(pathname: string) {
  // Returns { locale, pathnameWithoutLocale }
  const segments = pathname.split('/')
  // segments[0] is '', segments[1] could be locale
  const maybeLocale = segments[1]
  if (locales.includes(maybeLocale as 'en' | 'de')) {
    const withoutLocale =
      pathname.replace(new RegExp(`^/${maybeLocale}`), '') || '/'
    return { locale: maybeLocale, pathnameWithoutLocale: withoutLocale }
  }
  return { locale: 'en', pathnameWithoutLocale: pathname }
}

function withLocalePrefix(locale: string, path: string) {
  // Only prefix if locale is valid and not default 'en'
  if (!locale || locale === 'en') return path
  // ensure path begins with '/'
  return `/${locale}${path.startsWith('/') ? '' : '/'}${path}`.replace(
    /\/+/g,
    '/'
  )
}

// Public routes (without locale prefix). Keep this small: add more when needed.
const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/otp-verify',
  '/forgot-password',
  '/reset-password',
]

// --- middleware ---
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  console.log('Middleware - Processing pathname:', pathname)

  // Run i18n middleware first — it may return a redirect/response.
  const i18nResponse = i18nMiddleware(request)

  // If i18n middleware returned a response (redirect / rewrite), keep that response.
  if (i18nResponse) {
    console.log(
      'Middleware - i18n middleware returned response:',
      i18nResponse.status
    )
    return i18nResponse
  }

  const baseResponse = NextResponse.next()

  // Parse locale and normalized pathname (without locale prefix)
  const { locale, pathnameWithoutLocale } = extractLocaleAndPathname(pathname)

  console.log('Middleware - Extracted locale:', locale)
  console.log('Middleware - Pathname without locale:', pathnameWithoutLocale)

  // Add locale header so root layout/components can read it
  baseResponse.headers.set('x-locale', locale)

  // --- AUTH BYPASS MODE (temporary) ---
  // For now we bypass auth entirely and allow all routes to proceed.
  // TODO: When enabling auth:
  //  - read cookies (ACCESS_TOKEN / REFRESH_TOKEN)
  //  - if not authenticated and not public route => redirect to withLocalePrefix(locale, '/auth/login')
  //  - if authenticated and on auth route => redirect to withLocalePrefix(locale, '/dashboard')
  //  - fetch user profile once and set headers like x-user-role / x-user-id
  //  - enforce isAdminRoute checks
  //
  // Example helper calls (commented out):
  // const accessToken = request.cookies.get(ACCESS_TOKEN)?.value
  // const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value
  // const isAuthenticated = !!(accessToken || refreshToken)
  //
  // if (!isAuthenticated && !isPublicRoute(pathnameWithoutLocale)) { ... redirect ... }

  // Mark response so downstream systems know auth was intentionally bypassed (optional)
  baseResponse.headers.set('x-auth-bypassed', 'true')

  // If you want to expose the normalized pathname for debugging you can:
  baseResponse.headers.set('x-pathname-normalized', pathnameWithoutLocale)

  return baseResponse
}

export const config = {
  matcher: [
    // Skip files with extension and api routes
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
