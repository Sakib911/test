import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

import { locales, defaultTimeZone } from './i18n-config'

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale is supported
  if (!locales.includes(locale as 'en' | 'de')) {
    notFound()
  }

  return {
    locale: locale as string,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: defaultTimeZone, // Global timezone configuration
  }
})
