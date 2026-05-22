import { type SiteConfig, type SiteConfigResponse } from './site-config-service'
import { API_BASE_URL, GET_SITE_CONFIG } from '../lib/Constants'

/**
 * Server-side site config service for fetching configuration during SSR
 * This service makes direct HTTP calls without using the client-side API wrapper
 */
export const serverSiteConfigService = {
    /**
     * Fetch site configuration on the server side
     * Used in layout.tsx and other server components
     */
    getSiteConfig: async (): Promise<SiteConfig | null> => {
        try {
            // Get the backend URL from environment variables

            const response = await fetch(API_BASE_URL + GET_SITE_CONFIG, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Add cache control for better performance
                next: {
                    revalidate: 300 // Revalidate every 5 minutes
                },
            })

            if (!response.ok) {
                console.error('Failed to fetch site config:', response.status, response.statusText)
                return null
            }

            const data: SiteConfigResponse = await response.json()

            if (data.success && data.data) {
                return data.data
            }

            console.error('Site config API returned unsuccessful response:', data.message)
            return null
        } catch (error) {
            console.error('Error fetching site config on server:', error)
            return null
        }
    },

    /**
     * Get default site configuration when API fails
     * Provides fallback values for essential site config
     */
    getDefaultSiteConfig: (): SiteConfig => {
        return {
            siteName: 'FinCompare | Depot',
            logoUrl: '',
            faviconUrl: '/favicon.ico',
            defaultLanguage: 'de',
            seo: {
                metaTitle: 'FinCompare | Depot',
                metaDescription: 'Financial comparison platform',
            },
            contact: {
                companyName: 'FinCompare',
                email: 'admin@depot.com',
                phone: '+497676657657',
                address: '',
            },
            theme: {
                primaryColor: '#44ade2',
                secondaryColor: '#0877c7',
                backgroundColor: '#ffffff',
                cardColor: '#f8fafc',
                textPrimary: '#0f172a',
                textSecondary: '#64748b',
                borderColor: '#e2e8f0',
                successColor: '#22c55e',
                errorColor: '#ef4444',
                borderRadius: '0.5rem',
            },
            typography: {
                fontFamily: 'Proxima Nova',
            },
            footer: {
                copyrightText: `© ${new Date().getFullYear()} FinCompare | Depot. All rights reserved.`,
            },
            assets: {
                appleTouchIcon: '/apple-touch-icon.png',
                manifestIcon: '/manifest.json',
            },
        }
    },

    /**
     * Get site configuration with fallback to defaults
     * This ensures the app always has valid config data
     */
    getSiteConfigWithFallback: async (): Promise<SiteConfig> => {
        const siteConfig = await serverSiteConfigService.getSiteConfig()

        if (siteConfig) {
            // Merge with defaults to ensure all fields are present
            const defaultConfig = serverSiteConfigService.getDefaultSiteConfig()
            return {
                ...defaultConfig,
                ...siteConfig,
                seo: { ...defaultConfig.seo, ...siteConfig.seo },
                contact: { ...defaultConfig.contact, ...siteConfig.contact },
                theme: { ...defaultConfig.theme, ...siteConfig.theme },
                typography: { ...defaultConfig.typography, ...siteConfig.typography },
                footer: { ...defaultConfig.footer, ...siteConfig.footer },
                assets: { ...defaultConfig.assets, ...siteConfig.assets },
            }
        }

        return serverSiteConfigService.getDefaultSiteConfig()
    },
}
