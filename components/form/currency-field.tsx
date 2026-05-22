'use client'

import React from 'react'
import { Controller } from 'react-hook-form'

import { FormItem, FormLabel } from '../ui/form'

import type { Control, FieldValues, Path } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface CurrencyFieldProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  helperText?: string
  disabled?: boolean
  className?: string
  currency?: string
  currencySymbol?: string
  locale?: string
  allowNegative?: boolean
  maxLength?: number
  required?: boolean
}

const CurrencyField = <T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder = '0.00',
  helperText,
  disabled = false,
  // className,
  // currency,
  currencySymbol = '€',
  required,
  locale = 'de-DE',
  allowNegative = false,
  maxLength = 15,
}: CurrencyFieldProps<T>) => {
  const formatCurrency = (value: string | number): string => {
    if (!value && value !== 0) return ''

    const numericValue =
      typeof value === 'string'
        ? parseFloat(value.replace(/[^\d.-]/g, ''))
        : value

    if (isNaN(numericValue)) return ''

    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      useGrouping: true,
    }).format(numericValue)
  }

  const parseCurrencyValue = (value: string): string => {
    // For German locale, replace comma with dot for parsing
    let normalizedValue = value
    if (locale === 'de-DE') {
      normalizedValue = value.replace(/\./g, '').replace(/,/g, '.')
    }

    // Remove all non-numeric characters except decimal point and minus
    let cleaned = normalizedValue.replace(/[^\d.-]/g, '')

    // Handle negative values
    if (!allowNegative && cleaned.startsWith('-')) {
      cleaned = cleaned.substring(1)
    }

    // Ensure only one decimal point
    const parts = cleaned.split('.')
    if (parts.length > 2) {
      cleaned = `${parts[0]}.${parts.slice(1).join('')}`
    }

    // Limit decimal places to 2
    if (parts.length === 2 && parts[1].length > 2) {
      cleaned = `${parts[0]}.${parts[1].substring(0, 2)}`
    }

    return cleaned
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const inputValue = e.target.value

          // If the input is empty, clear the field
          if (!inputValue.trim()) {
            field.onChange('')
            return
          }

          // For German locale, allow comma as decimal separator during typing
          let normalizedInput = inputValue
          if (locale === 'de-DE') {
            // Allow typing with comma as decimal separator
            normalizedInput = inputValue.replace(/\./g, '').replace(/,/g, '.')
          }

          // Parse the input value
          const parsedValue = parseCurrencyValue(normalizedInput)

          // Only update if we have a valid parsed value or if it's a valid German format
          if (
            parsedValue !== '' ||
            inputValue === '' ||
            (locale === 'de-DE' && /^[\d.,]+$/.test(inputValue))
          ) {
            field.onChange(parsedValue)
          }
        }

        const handleBlur = () => {
          // Format the value on blur for better UX
          if (field.value) {
            // const formattedValue = formatCurrency(field.value)
            // Don't change the actual value, just format for display
          }
          field.onBlur()
        }

        // Use the raw value for input, format only for display
        const displayValue = field.value ? formatCurrency(field.value) : ''

        return (
          <FormItem className="flex h-[58px] max-h-[58px] w-full flex-col items-start  bg-sand px-2">
            {label && (
              <FormLabel className="flex items-center">
                {label}
                {required && (
                  <span className="text-[18px] text-destructive">*</span>
                )}
              </FormLabel>
            )}
            <div className="relative w-full">
              <Input
                id={name}
                type="text"
                placeholder={placeholder}
                disabled={disabled}
                value={displayValue}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={maxLength}
                className={cn(
                  'pr-12',
                  error && 'border-destructive focus-visible:ring-destructive'
                )}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-sm font-medium text-muted-foreground">
                  {currencySymbol}
                </span>
              </div>
            </div>
            {helperText && !error && (
              <p className="text-xs text-muted-foreground">{helperText}</p>
            )}
            {error && (
              <p className="text-xs text-destructive">{error.message}</p>
            )}
          </FormItem>
        )
      }}
    />
  )
}

export default CurrencyField
