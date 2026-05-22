'use client'

import { usePathname } from 'next/navigation'

import type { Locale } from '@/lib/i18n-config'

import { locales } from '@/lib/i18n-config'

export function useLanguageSwitcher() {
  const pathname = usePathname()

  // Detect current locale from URL path (always expecting locale prefix)
  const getCurrentLocaleFromPath = (): Locale => {
    const segments = pathname.split('/').filter(Boolean)

    // Check if first segment is a valid locale
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      return segments[0] as Locale
    }

    // Default to English if no locale found (shouldn't happen with middleware)
    return 'en'
  }

  const currentLocale = getCurrentLocaleFromPath()

  // Debug current state
  if (process.env.NODE_ENV === 'development') {
    console.warn('🌐 Current Language State (Always Prefix):', {
      currentLocale,
      pathname,
      segments: pathname.split('/').filter(Boolean),
      note: 'Always expecting locale prefix in URL',
    })
  }

  const switchLanguage = (locale: string) => {
    // Check if the locale is valid
    if (!locales.includes(locale as 'en' | 'de')) return

    // Don't switch if already on this locale
    if (locale === currentLocale) return

    // Extract the path without locale prefix
    let pathWithoutLocale = pathname

    // Remove current locale prefix
    const currentPathSegments = pathname.split('/').filter(Boolean)
    if (
      currentPathSegments.length > 0 &&
      locales.includes(currentPathSegments[0] as Locale)
    ) {
      // Remove the first segment (locale) and reconstruct path
      const remainingSegments = currentPathSegments.slice(1)
      pathWithoutLocale =
        remainingSegments.length > 0 ? `/${remainingSegments.join('/')}` : '/'
    }

    // Ensure path starts with /
    if (!pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = `/${pathWithoutLocale}`
    }

    // Always construct path with locale prefix (both en and de show prefix)
    const newPath = `/${locale}${pathWithoutLocale}`

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.warn('🌐 Language Switch (Always Prefix):', {
        from: currentLocale,
        to: locale,
        currentPath: pathname,
        pathWithoutLocale,
        newPath,
        method: 'Always show locale prefix for all languages',
      })
    }

    // Navigate to the new path with proper routing
    if (typeof window !== 'undefined') {
      // Use window.location.href for full page reload to ensure proper middleware handling
      window.location.href = newPath
    }
  }

  const getLocalizedPath = (path: string) => {
    // Extract the path without any locale prefix
    let pathWithoutLocale = path

    // Remove locale prefix if present
    const pathSegments = path.split('/').filter(Boolean)
    if (
      pathSegments.length > 0 &&
      locales.includes(pathSegments[0] as Locale)
    ) {
      // Remove the first segment (locale) and reconstruct path
      const remainingSegments = pathSegments.slice(1)
      pathWithoutLocale =
        remainingSegments.length > 0 ? `/${remainingSegments.join('/')}` : '/'
    }

    // Ensure path starts with /
    if (!pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = `/${pathWithoutLocale}`
    }

    // Always construct path with current locale prefix
    if (pathWithoutLocale === '/') {
      return `/${currentLocale}`
    } else {
      return `/${currentLocale}${pathWithoutLocale}`
    }
  }

  return {
    currentLocale,
    locales,
    switchLanguage,
    getLocalizedPath,
  }
}
