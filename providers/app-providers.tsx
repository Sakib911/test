'use client'

import type { ReactNode } from 'react'

import { AuthProvider } from '@/contexts/auth-context'
import { SiteConfigProvider } from '@/contexts/site-config-context'
import { ThemeProvider } from '@/contexts/theme-context'
import { type SiteConfig } from '@/services/site-config-service'
import QueryProvider from './QueryProvider'

interface AppProvidersProps {
  children: ReactNode
  initialSiteConfig?: SiteConfig
}

/**
 * Main providers component that wraps all global contexts
 * Styles are now applied server-side in layout.tsx for better performance
 */
export function AppProviders({
  children,
  initialSiteConfig,
}: AppProvidersProps) {
  return (
    <SiteConfigProvider initialSiteConfig={initialSiteConfig}>
      <ThemeProvider>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </SiteConfigProvider>
  )
}
