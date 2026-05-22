import api from './Api'
import { GET_SITE_CONFIG, UPSERT_SITE_CONFIG } from '../lib/Constants'

export interface SiteConfig {
  _id?: string
  siteName?: string
  logoUrl?: string
  faviconUrl?: string
  defaultLanguage?: 'en' | 'de' | 'fr' | 'es'
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  contact?: {
    companyName?: string
    email?: string
    phone?: string
    address?: string
  }
  theme?: {
    primaryColor?: string
    secondaryColor?: string
    backgroundColor?: string
    cardColor?: string
    textPrimary?: string
    textSecondary?: string
    borderColor?: string
    successColor?: string
    errorColor?: string
    borderRadius?: string
  }
  typography?: {
    fontFamily?: string
  }
  footer?: {
    copyrightText?: string
  }
  assets?: {
    appleTouchIcon?: string
    manifestIcon?: string
  }
  created_at?: string
  updated_at?: string
  last_modified_by?: string
}

export interface SiteConfigResponse {
  statusCode: number
  success: boolean
  message: string
  data: SiteConfig
}

export const siteConfigService = {
  /**
   * Get current site configuration
   * For use with React Query - errors are handled by the query client
   */
  getSiteConfig: async (): Promise<any> => {
    api.getSingleData(
      {
        url: GET_SITE_CONFIG,
      },
      (response: any) => {
        return response.data
      }
    )
  },

  /**
   * Create or update site configuration
   * For use with React Query - errors are handled by the mutation client
   */
  upsertSiteConfig: async (
    siteConfigData: Partial<SiteConfig>
  ): Promise<any> => {
    api.updateData(
      {
        url: UPSERT_SITE_CONFIG,
        body: siteConfigData,
      },
      (response: any) => {
        return response.data
      }
    )
  },

  // Legacy method name for backward compatibility
  useSiteConfig: async (): Promise<SiteConfigResponse> => {
    return siteConfigService.getSiteConfig()
  },
}
