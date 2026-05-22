import { useState, useEffect, useCallback } from 'react'

interface UseDebouncedSearchProps {
  delay?: number
  onClear?: () => void
}

export const useDebouncedSearch = ({
  delay = 300,
  onClear,
}: UseDebouncedSearchProps = {}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, delay)

    return () => clearTimeout(timer)
  }, [searchTerm, delay])

  const clearSearch = useCallback(() => {
    setSearchTerm('')
    setDebouncedSearchTerm('')
    onClear?.()
  }, [onClear])

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (searchTerm) {
          clearSearch()
        }
      }
    },
    [searchTerm, clearSearch]
  )

  return {
    searchTerm,
    debouncedSearchTerm,
    handleSearchChange,
    clearSearch,
    handleKeyDown,
  }
}
