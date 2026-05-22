import { getRequestConfig } from 'next-intl/server'
import { locales } from '../lib/i18n-config'

export default getRequestConfig(async ({ locale }) => {
  console.log('i18n/request.ts - Received locale:', locale)

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as 'en' | 'de')) {
    console.log('i18n/request.ts - Invalid locale, falling back to English')
    // Fallback to English if locale is invalid
    locale = 'en'
  }

  console.log('i18n/request.ts - Using locale:', locale)
  console.log(
    'i18n/request.ts - Loading messages from:',
    `../messages/${locale}.json`
  )

  try {
    const messages = (await import(`../messages/${locale}.json`)).default
    return {
      locale,
      messages,
      timeZone: 'Europe/Berlin', // Global timezone configuration
    }
  } catch (error) {
    console.error('i18n/request.ts - Error loading messages:', error)
    // Fallback to English messages if loading fails
    const fallbackMessages = (await import(`../messages/en.json`)).default
    return {
      locale: 'en',
      messages: fallbackMessages,
      timeZone: 'Europe/Berlin',
    }
  }
})
