'use client'

import { NextIntlClientProvider } from 'next-intl'

import type { ReactNode } from 'react'

import { defaultTimeZone } from '@/lib/i18n-config'

type IntlProviderProps = {
  locale: string
  messages: Record<string, unknown>
  children: ReactNode
  timeZone?: string
}

export function IntlProvider({
  locale,
  messages,
  children,
  timeZone = defaultTimeZone, // Default timezone to prevent environment fallback warnings
}: IntlProviderProps) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
    >
      {children}
    </NextIntlClientProvider>
  )
}
