'use client'

import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { CalendarIcon, Search, X, RefreshCcw, Plus } from 'lucide-react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState, useCallback, useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

// Filter types enum
export type FilterType =
  | 'search'
  | 'select'
  | 'date'
  | 'date-range'
  | 'number-range'
  | 'boolean'
  | 'currency'

export interface SelectOption {
  label: string
  value: string
}

export interface FilterConfig {
  key: string
  type: FilterType
  label: string
  className: string
  placeholder?: string
  options?: SelectOption[] // For select filters
  min?: number // For number range filters
  max?: number // For number range filters
  defaultValue?: unknown
  // Currency specific props
  currency?: string // Currency code (USD, EUR, etc.)
  currencySymbol?: string // Currency symbol ($, €, etc.)
  locale?: string // Locale for formatting (en-US, de-DE, etc.)
  allowNegative?: boolean // Allow negative values
}

export interface FilterValues {
  [key: string]: unknown
}

export interface ActionFiltersProps {
  filters: FilterConfig[]
  onFiltersChange: (filters: FilterValues) => void
  onReset?: () => void
  className?: string
  showFilterCount?: boolean
  collapsible?: boolean
  // Query string support
  useQueryString?: boolean
  queryStringPrefix?: string
  // Controlled mode
  value?: FilterValues
  defaultValue?: FilterValues
  //Admin Function
  admin?: {
    isAdmin: boolean
    setModalOpen: () => void
  }
}

// Helper functions for query string serialization
const serializeFilterValue = (value: unknown): string => {
  if (value === null || value === undefined) return ''
  if (typeof value === 'object') {
    return JSON.stringify(value)
  }
  return String(value)
}

const deserializeFilterValue = (value: string, type: FilterType): unknown => {
  if (!value) return undefined

  switch (type) {
    case 'boolean':
      return value === 'true'
    case 'currency': {
      const numValue = parseFloat(value)
      return isNaN(numValue) ? undefined : numValue.toString()
    }
    case 'number-range':
    case 'date-range':
      try {
        return JSON.parse(value)
      } catch {
        return undefined
      }
    default:
      return value
  }
}

const ActionFilters = ({
  filters,
  onFiltersChange,
  onReset,
  className,
  collapsible = false,
  useQueryString = false,
  queryStringPrefix = 'filter',
  value: controlledValue,
  defaultValue,
  admin,
}: ActionFiltersProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isCollapsed] = useState(collapsible)
  const t = useTranslations('dashboard.columns')

  // Determine if component is controlled
  const isControlled = controlledValue !== undefined

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<FilterValues>({})

  // Get current filter values
  const filterValues = isControlled ? controlledValue : internalValue

  // Initialize from query string or default values
  useEffect(() => {
    if (isControlled) return // Skip initialization for controlled mode

    const initialValues: FilterValues = {}

    if (useQueryString) {
      // Load from query string
      filters.forEach((filter) => {
        const paramKey = `${queryStringPrefix}_${filter.key}`
        const paramValue = searchParams.get(paramKey)
        if (paramValue) {
          const deserializedValue = deserializeFilterValue(
            paramValue,
            filter.type
          )
          if (deserializedValue !== undefined) {
            initialValues[filter.key] = deserializedValue
          }
        }
      })
    } else {
      // Load from defaultValue or filter.defaultValue
      const defaults = defaultValue || {}
      filters.forEach((filter) => {
        if (defaults[filter.key] !== undefined) {
          initialValues[filter.key] = defaults[filter.key]
        } else if (filter.defaultValue !== undefined) {
          initialValues[filter.key] = filter.defaultValue
        }
      })
    }

    setInternalValue(initialValues)
  }, [
    filters,
    useQueryString,
    queryStringPrefix,
    searchParams,
    defaultValue,
    isControlled,
  ])

  // Update query string when filters change
  useEffect(() => {
    if (!useQueryString || isControlled) return

    const params = new URLSearchParams(searchParams.toString())

    // Remove all existing filter params
    filters.forEach((filter) => {
      const paramKey = `${queryStringPrefix}_${filter.key}`
      params.delete(paramKey)
    })

    // Add current filter values
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        const paramKey = `${queryStringPrefix}_${key}`
        params.set(paramKey, serializeFilterValue(value))
      }
    })

    const newUrl = `${pathname}?${params.toString()}`
    router.replace(newUrl)
  }, [
    filterValues,
    useQueryString,
    queryStringPrefix,
    pathname,
    router,
    searchParams,
    filters,
    isControlled,
  ])

  // Notify parent when filter values change
  const onFiltersChangeRef = useRef(onFiltersChange)
  onFiltersChangeRef.current = onFiltersChange

  const prevFilterValuesRef = useRef<FilterValues>({})

  useEffect(() => {
    const hasChanged =
      JSON.stringify(prevFilterValuesRef.current) !==
      JSON.stringify(filterValues)
    if (hasChanged) {
      prevFilterValuesRef.current = filterValues
      onFiltersChangeRef.current(filterValues)
    }
  }, [filterValues])

  const updateFilter = useCallback(
    (key: string, value: unknown) => {
      if (isControlled) {
        // In controlled mode, call parent with updated values
        const newValues = { ...filterValues }
        if (value === undefined) {
          delete newValues[key]
        } else {
          newValues[key] = value
        }
        onFiltersChange(newValues)
      } else {
        // In uncontrolled mode, update internal state
        setInternalValue((prev) => {
          const newValues = { ...prev }
          if (value === undefined) {
            delete newValues[key]
          } else {
            newValues[key] = value
          }
          return newValues
        })
      }
    },
    [isControlled, filterValues, onFiltersChange]
  )

  const clearFilter = useCallback(
    (key: string) => {
      updateFilter(key, undefined)
    },
    [updateFilter]
  )

  const resetAllFilters = useCallback(() => {
    if (isControlled) {
      onFiltersChange({})
    } else {
      setInternalValue({})
    }
    if (onReset) {
      onReset()
    }
  }, [isControlled, onFiltersChange, onReset])

  // const getActiveFilterCount = useCallback(() => {
  //   return Object.keys(filterValues).filter((key) => {
  //     const value = filterValues[key]
  //     if (value === null || value === undefined || value === '') return false
  //     if (Array.isArray(value) && value.length === 0) return false
  //     if (typeof value === 'object' && !('from' in value) && !('to' in value))
  //       return false
  //     return true
  //   }).length
  // }, [filterValues])

  const renderFilter = (filter: FilterConfig) => {
    const value = filterValues[filter.key]

    switch (filter.type) {
      case 'search':
        return (
          <div className="relative flex-1 w-full sm:w-full lg:min-w-[250px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={
                filter.placeholder || `Search ${filter.label.toLowerCase()}...`
              }
              value={value ? String(value) : ''}
              onChange={(e) => updateFilter(filter.key, e.target.value)}
              className="pl-9 h-8 sm:h-10 text-xs sm:text-sm w-full"
            />
            {value !== undefined && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 h-6 w-6 sm:h-8 sm:w-8 p-0 -translate-y-1/2"
                onClick={() => clearFilter(filter.key)}
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            )}
          </div>
        )

      case 'select':
        return (
          <div className="w-full sm:w-full lg:min-w-[180px] flex items-center border-b h-[45px] sm:h-[50px] lg:h-[53px] border-sandBorder bg-sand px-1 sm:px-2">
            <Select
              value={value ? String(value) : ''}
              onValueChange={(newValue) => {
                updateFilter(filter.key, newValue || undefined)
              }}
            >
              <SelectTrigger className="h-8 sm:h-9 lg:h-10 text-xs sm:text-sm w-full">
                <SelectValue
                  placeholder={
                    filter.placeholder || `Select ${filter.label.toLowerCase()}`
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {filter.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )

      case 'date':
        return (
          <div className="w-full sm:w-full lg:min-w-[200px]">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'h-8 sm:h-9 lg:h-10 w-full justify-start text-left font-normal text-xs sm:text-sm',
                    !value && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  {value ? (
                    format(new Date(value as string), 'PPP')
                  ) : (
                    <span>
                      {filter.placeholder ||
                        `Pick ${filter.label.toLowerCase()}`}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={value ? new Date(value as string) : undefined}
                  onSelect={(date) =>
                    updateFilter(filter.key, date?.toISOString())
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        )

      case 'currency': {
        const currencySymbol = filter.currencySymbol || '$'
        const locale = filter.locale || 'en-US'
        const currency = filter.currency || 'USD'

        // Format display value
        const formatCurrency = (val: number | string) => {
          if (!val || val === '') return ''
          const numVal = typeof val === 'string' ? parseFloat(val) : val
          if (isNaN(numVal)) return ''

          return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(numVal)
        }

        // Parse input value (remove currency formatting)
        const parseCurrencyInput = (inputValue: string) => {
          if (!inputValue) return ''
          // Remove currency symbols, spaces, and commas
          const cleaned = inputValue.replace(/[$€£¥,\s]/g, '')
          const number = parseFloat(cleaned)
          return isNaN(number) ? '' : number.toString()
        }

        return (
          <div className="relative flex items-center border-b h-[45px] sm:h-[50px] lg:h-[53px] max-h-[45px] sm:max-h-[50px] lg:max-h-[53px] border-sandBorder bg-sand px-1 sm:px-2 w-full">
            <div className="relative w-full">
              <span className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 text-primary text-sm sm:text-base lg:text-lg">
                {currencySymbol}
              </span>
              <Input
                type="text"
                placeholder={
                  filter.placeholder ||
                  `${t('enter')} ${filter.label.toLowerCase()}`
                }
                value={value ? String(value) : ''}
                onChange={(e) => {
                  const inputValue = e.target.value
                  const parsedValue = parseCurrencyInput(inputValue)
                  updateFilter(filter.key, parsedValue)
                }}
                onBlur={(e) => {
                  // Format on blur for better UX
                  const parsedValue = parseCurrencyInput(e.target.value)
                  if (parsedValue) {
                    const formatted = formatCurrency(parsedValue)
                    e.target.value = formatted
                  }
                }}
                onFocus={(e) => {
                  // Remove formatting on focus for easier editing
                  if (value) {
                    e.target.value = value.toString()
                  }
                }}
                className="h-8 sm:h-9 lg:h-10 pl-6 sm:pl-7 lg:pl-8 text-xs sm:text-sm w-full"
                min={filter.allowNegative ? undefined : 0}
              />
              {value !== undefined && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 p-0 -translate-y-1/2"
                  onClick={() => clearFilter(filter.key)}
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                </Button>
              )}
            </div>
          </div>
        )
      }

      case 'date-range': {
        return (
          <div className="w-full sm:w-full lg:min-w-[250px]">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'h-8 sm:h-9 lg:h-10 w-full justify-start text-left font-normal text-xs sm:text-sm',
                    !(value && typeof value === 'object' && 'from' in value) &&
                      'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  {value && typeof value === 'object' && 'from' in value ? (
                    'to' in value ? (
                      <>
                        {format(new Date(value.from as string), 'LLL dd, y')} -{' '}
                        {format(new Date(value.to as string), 'LLL dd, y')}
                      </>
                    ) : (
                      format(new Date(value.from as string), 'LLL dd, y')
                    )
                  ) : (
                    <span>
                      {filter.placeholder ||
                        `Pick ${filter.label.toLowerCase()} range`}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={value as DateRange}
                  onSelect={(range) => updateFilter(filter.key, range)}
                  numberOfMonths={1}
                  className="sm:block lg:hidden"
                />
                <Calendar
                  mode="range"
                  selected={value as DateRange}
                  onSelect={(range) => updateFilter(filter.key, range)}
                  numberOfMonths={2}
                  className="hidden lg:block"
                />
              </PopoverContent>
            </Popover>
          </div>
        )
      }

      case 'number-range': {
        return (
          <div className="flex items-center gap-1 sm:gap-2 w-full lg:min-w-[200px]">
            <Input
              type="number"
              placeholder={`Min ${filter.label.toLowerCase()}`}
              value={
                value && typeof value === 'object' && 'min' in value
                  ? String((value as { min: number }).min)
                  : ''
              }
              onChange={(e) =>
                updateFilter(filter.key, {
                  ...(value && typeof value === 'object' ? value : {}),
                  min: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="h-8 sm:h-9 lg:h-10 flex-1 sm:flex-1 lg:w-24 text-xs sm:text-sm"
              min={filter.min}
              max={filter.max}
            />
            <span className="text-muted-foreground text-xs sm:text-sm">-</span>
            <Input
              type="number"
              placeholder={`Max ${filter.label.toLowerCase()}`}
              value={
                value && typeof value === 'object' && 'max' in value
                  ? String((value as { max: number }).max)
                  : ''
              }
              onChange={(e) =>
                updateFilter(filter.key, {
                  ...(typeof value === 'object' && value !== null ? value : {}),
                  max: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="h-8 sm:h-9 lg:h-10 flex-1 sm:flex-1 lg:w-24 text-xs sm:text-sm"
              min={filter.min}
              max={filter.max}
            />
          </div>
        )
      }

      case 'boolean': {
        return (
          <div className="w-full sm:w-full lg:min-w-[120px]">
            <Select
              value={value !== undefined ? String(value) : 'all'}
              onValueChange={(newValue) => {
                updateFilter(
                  filter.key,
                  newValue === 'all' ? undefined : newValue === 'true'
                )
              }}
            >
              <SelectTrigger className="h-8 sm:h-9 lg:h-10 text-xs sm:text-sm w-full">
                <SelectValue placeholder={filter.placeholder || filter.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )
      }

      default:
        return null
    }
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Filter Content */}
      {!isCollapsed && (
        <div className="flex flex-row items-start lg:items-end gap-3 sm:gap-4 lg:gap-2 justify-center">
          <div
            className={cn(
              'grid grid-cols-12 items-start lg:items-center gap-3 sm:gap-4 lg:gap-4 w-full'
            )}
          >
            {filters.map((filter) => (
              <div
                key={filter.key}
                className={`flex flex-col gap-1 ${
                  filter.className || 'sm:col-span-1 lg:col-span-4'
                }`}
              >
                <label className="text-xs text-nowrap truncate sm:text-sm font-medium text-muted-foreground">
                  {filter.label}
                </label>
                {renderFilter(filter)}
              </div>
            ))}
            {admin?.isAdmin && (
              <div className="col-span-3 flex flex-col gap-1">
                <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {t('actions')}
                </label>
                <Button
                  onClick={admin.setModalOpen}
                  className="max-h-[52px] text-white text-sm sm:text-base font-normal w-full"
                >
                  <Plus className="min-h-4 min-w-4  mr-1 sm:mr-2" />
                  <span className="text-xs md:text-base">
                    {t('Addnewoffer')}
                  </span>
                </Button>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            className="h-10 sm:h-12 lg:h-14 w-10 sm:w-12 lg:w-14 bg-sand rounded-none flex-shrink-0 self-center lg:self-end mt-4 max-h-[52px]"
            onClick={resetAllFilters}
          >
            <RefreshCcw className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-primary" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default ActionFilters
