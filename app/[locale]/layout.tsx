import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Locale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

import { Toaster } from '@/components/ui/sonner'
import { AppProviders } from '@/providers/app-providers'
import { locales } from '@/lib/i18n-config'

import '../globals.css'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Design System - Starter Pack',
  description: 'Comprehensive component library and design patterns',
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Validate that the incoming locale is supported
  if (!locales.includes(locale as 'en' | 'de')) {
    notFound()
  }

  // Providing all messages to the client side - direct import based on locale
  const messages = (await import(`../../messages/${locale}.json`)).default
  console.log('Layout - Current locale:', locale)
  console.log('Layout - Messages loaded for:', locale)
  console.log('Layout - Sample message:', messages.homepage?.title)
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppProviders>
            <DashboardLayout>{children}</DashboardLayout>
            <Toaster />
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}
