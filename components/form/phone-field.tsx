'use client'

import React from 'react'
import { Controller } from 'react-hook-form'

import type { Control, FieldValues, Path } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface PhoneFieldProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  helperText?: string
  disabled?: boolean
  className?: string
  defaultCountryCode?: string
}

const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+39', country: 'IT', flag: '🇮🇹' },
  { code: '+34', country: 'ES', flag: '🇪🇸' },
  { code: '+31', country: 'NL', flag: '🇳🇱' },
  { code: '+32', country: 'BE', flag: '🇧🇪' },
  { code: '+41', country: 'CH', flag: '🇨🇭' },
  { code: '+43', country: 'AT', flag: '🇦🇹' },
  { code: '+880', country: 'BD', flag: '🇧🇩' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
]

const PhoneField = <T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder = 'Enter phone number',
  helperText,
  disabled = false,
  className,
  defaultCountryCode = '+49',
}: PhoneFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        // Parse the current value to extract country code and number
        const currentValue = String(field.value || '')
        let countryCode = defaultCountryCode
        let phoneNumber = ''

        if (currentValue) {
          // Find matching country code
          const matchedCode = countryCodes.find(cc =>
            currentValue.startsWith(cc.code)
          )
          if (matchedCode) {
            countryCode = matchedCode.code
            phoneNumber = currentValue.slice(matchedCode.code.length).trim()
          } else {
            phoneNumber = currentValue
          }
        }

        const handleCountryCodeChange = (newCountryCode: string) => {
          const newValue = `${newCountryCode} ${phoneNumber}`.trim()
          field.onChange(newValue)
        }

        const handlePhoneNumberChange = (
          e: React.ChangeEvent<HTMLInputElement>
        ) => {
          const newNumber = e.target.value
          const newValue = `${countryCode}${newNumber}`.trim()
          field.onChange(newValue)
        }

        return (
          <div className={cn('space-y-2', className)}>
            {label && (
              <Label htmlFor={name} className='text-sm font-medium'>
                {label}
              </Label>
            )}
            <div className='flex space-x-2'>
              <Select
                disabled={disabled}
                value={countryCode}
                onValueChange={handleCountryCodeChange}
              >
                <SelectTrigger className='w-[120px]'>
                  <SelectValue>
                    {countryCodes.find(cc => cc.code === countryCode)?.flag}{' '}
                    {countryCode}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map(country => (
                    <SelectItem key={country.code} value={country.code}>
                      <div className='flex items-center space-x-2'>
                        <span>{country.flag}</span>
                        <span>{country.code}</span>
                        <span className='text-xs text-muted-foreground'>
                          {country.country}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id={name}
                type='tel'
                placeholder={placeholder}
                disabled={disabled}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className={cn(
                  'flex-1',
                  error && 'border-destructive focus-visible:ring-destructive'
                )}
              />
            </div>
            {helperText && !error && (
              <p className='text-xs text-muted-foreground'>{helperText}</p>
            )}
            {error && (
              <p className='text-xs text-destructive'>{error.message}</p>
            )}
          </div>
        )
      }}
    />
  )
}

export default PhoneField
