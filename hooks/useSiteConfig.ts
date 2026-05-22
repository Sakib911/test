import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  siteConfigService,
  type SiteConfig,
  type SiteConfigResponse,
} from '@/services/site-config-service'

// Query Keys
export const SITE_CONFIG_KEYS = {
  all: ['siteConfig'] as const,
  detail: () => [...SITE_CONFIG_KEYS.all, 'detail'] as const,
} as const

/**
 * Hook to fetch site configuration
 */
export const useSiteConfig = (initialData?: SiteConfig) => {
  return useQuery({
    queryKey: SITE_CONFIG_KEYS.detail(),
    queryFn: siteConfigService.getSiteConfig,
    retry: (failureCount, error: any) => {
      // Don't retry on client errors
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false
      }
      return failureCount < 2
    },
    // Use initial data if provided (from SSR)
    initialData: initialData
      ? {
          statusCode: 200,
          success: true,
          message: 'Site config loaded from server',
          data: initialData,
        }
      : undefined,
    // Consider data stale after 5 minutes
    staleTime: 5 * 60 * 1000,
    // Cache for 10 minutes
    gcTime: 10 * 60 * 1000,
  })
}

/**
 * Hook to create or update site configuration
 */
export const useUpsertSiteConfig = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (siteConfigData: Partial<SiteConfig>) =>
      siteConfigService.upsertSiteConfig(siteConfigData),
    onSuccess: (data: SiteConfigResponse) => {
      // Invalidate and refetch site config
      queryClient.invalidateQueries({
        queryKey: SITE_CONFIG_KEYS.all,
      })

      // Optionally update the cache directly for immediate UI update
      queryClient.setQueryData(SITE_CONFIG_KEYS.detail(), data)

      toast.success(data.message || 'Site configuration updated successfully')
    },
    onError: (error: any) => {
      console.error('Site config upsert error:', error)
      toast.error(
        error?.response?.data?.message || 'Failed to update site configuration'
      )
    },
  })
}

/**
 * Hook to prefetch site configuration
 * Useful for preloading data before navigation
 */
export const usePrefetchSiteConfig = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.prefetchQuery({
      queryKey: SITE_CONFIG_KEYS.detail(),
      queryFn: siteConfigService.getSiteConfig,
      staleTime: 5 * 60 * 1000,
    })
  }
}

/**
 * Hook to get cached site configuration without triggering a fetch
 * Returns undefined if not in cache
 */
export const useCachedSiteConfig = () => {
  const queryClient = useQueryClient()
  return queryClient.getQueryData<SiteConfigResponse>(SITE_CONFIG_KEYS.detail())
}

/**
 * Hook to manually invalidate site config cache
 * Useful when you want to force a refetch
 */
export const useInvalidateSiteConfig = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({
      queryKey: SITE_CONFIG_KEYS.all,
    })
  }
}
