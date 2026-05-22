import { useEffect, useRef, type RefObject } from 'react'

export interface UseInfiniteScrollOptions {
  rootRef: RefObject<HTMLElement | null>
  onLoadMore?: () => void
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  loading?: boolean
  enabled?: boolean
  rootMargin?: string
  threshold?: number
  minIntervalMs?: number
}

export function useInfiniteScroll({
  rootRef,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  loading,
  enabled = true,
  rootMargin = '0px 0px 200px 0px',
  threshold = 0.1,
  minIntervalMs = 500,
}: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const lastTriggeredAtRef = useRef<number>(0)

  useEffect(() => {
    if (!enabled) return
    if (!onLoadMore || !sentinelRef.current || !rootRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const now = Date.now()
        const lastTriggeredAt = lastTriggeredAtRef.current
        if (
          entry.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !loading &&
          now - lastTriggeredAt > minIntervalMs
        ) {
          lastTriggeredAtRef.current = now
          onLoadMore()
        }
      },
      {
        root: rootRef.current,
        rootMargin,
        threshold,
      }
    )

    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [
    enabled,
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
    loading,
    rootMargin,
    threshold,
    rootRef,
    minIntervalMs,
  ])

  return { sentinelRef }
}
