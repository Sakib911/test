'use client'

import PhoneInput, { Country } from 'react-phone-number-input'

import type { Control, FieldValues, Path } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import 'react-phone-number-input/style.css'

interface PhoneFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  helperText?: string
  className?: string
  defaultCountry?: string
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

const PhoneCountryField = <T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  helperText,
  className,
  defaultCountry = 'DE',
}: PhoneFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <PhoneInput
              countryCallingCodeEditable={false}
              countries={[
                'DE',
                'US',
                'BD',
                'IN',
                'GB',
                'FR',
                'IT',
                'ES',
                'NL',
                'BE',
                'CH',
                'AT',
              ]}
              international={true}
              defaultCountry={defaultCountry as Country}
              value={field.value as string | undefined}
              onChange={field.onChange}
              className={cn(
                'PhoneInputInput flex items-center gap-2',
                className
              )}
            />
          </FormControl>
          {helperText && <FormDescription>{helperText}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default PhoneCountryField
