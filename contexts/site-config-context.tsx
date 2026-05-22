'use client'

import React, { createContext, useContext } from 'react'

import { type SiteConfig } from '@/services/site-config-service'

interface SiteConfigContextType {
  siteConfig: SiteConfig | null
  isLoading: boolean
  error: string | null
  refetchSiteConfig?: () => Promise<void>
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(
  undefined
)

interface SiteConfigProviderProps {
  children: React.ReactNode
  initialSiteConfig?: SiteConfig
}

export const SiteConfigProvider: React.FC<SiteConfigProviderProps> = ({
  children,
  initialSiteConfig,
}) => {
  // Optimized server-side approach: Site config is pre-loaded during SSR
  // CSS variables are applied server-side, eliminating client-side style updates
  const value: SiteConfigContextType = {
    siteConfig: initialSiteConfig || null,
    isLoading: false,
    error: null,
    refetchSiteConfig: undefined,
  }

  return (
    <SiteConfigContext.Provider value={value}>
      {children}
    </SiteConfigContext.Provider>
  )
}

// Custom hook to use site config
export const useSiteConfigData = () => {
  const context = useContext(SiteConfigContext)
  if (context === undefined) {
    throw new Error(
      'useSiteConfigData must be used within a SiteConfigProvider'
    )
  }
  return context
}

// Utility hooks for specific config sections
export const useBasicSiteInfo = () => {
  const { siteConfig } = useSiteConfigData()
  return {
    siteName: siteConfig?.siteName || 'FinCompare | Depot',
    companyName: siteConfig?.contact?.companyName || '',
    defaultLanguage: siteConfig?.defaultLanguage || 'en',
    logoUrl: siteConfig?.logoUrl || '',
    faviconUrl: siteConfig?.faviconUrl || '',
  }
}

export const useSiteTheme = () => {
  const { siteConfig } = useSiteConfigData()
  return {
    primaryColor: siteConfig?.theme?.primaryColor || '#44ade2',
    secondaryColor: siteConfig?.theme?.secondaryColor || '#0877C7',
    backgroundColor: siteConfig?.theme?.backgroundColor || '#ffffff',
    cardColor: siteConfig?.theme?.cardColor || '#f8fafc',
    textPrimary: siteConfig?.theme?.textPrimary || '#000000',
    textSecondary: siteConfig?.theme?.textSecondary || '#292B37',
    borderColor: siteConfig?.theme?.borderColor || '#D0D5DD',
    successColor: siteConfig?.theme?.successColor || '#4B8E17',
    errorColor: siteConfig?.theme?.errorColor || '#D01515',
    borderRadius: siteConfig?.theme?.borderRadius || '',
  }
}

export const useSiteSEO = () => {
  const { siteConfig } = useSiteConfigData()
  return {
    metaTitle: siteConfig?.seo?.metaTitle || 'FinCompare | Depot',
    metaDescription:
      siteConfig?.seo?.metaDescription || 'Financial comparison platform',
  }
}

export const useSiteContact = () => {
  const { siteConfig } = useSiteConfigData()
  return {
    companyName: siteConfig?.contact?.companyName || '',
    email: siteConfig?.contact?.email || '',
    phone: siteConfig?.contact?.phone || '',
    address: siteConfig?.contact?.address || '',
  }
}

export const useSiteTypography = () => {
  const { siteConfig } = useSiteConfigData()
  return {
    fontFamily: siteConfig?.typography?.fontFamily || 'Proxima Nova',
  }
}

export const useSiteFooter = () => {
  const { siteConfig } = useSiteConfigData()
  return {
    copyrightText:
      siteConfig?.footer?.copyrightText ||
      `© ${new Date().getFullYear()} FinCompare | Depot. All rights reserved.`,
  }
}

export const useSiteAssets = () => {
  const { siteConfig } = useSiteConfigData()
  return {
    appleTouchIcon: siteConfig?.assets?.appleTouchIcon || '',
    manifestIcon: siteConfig?.assets?.manifestIcon || '',
  }
}
