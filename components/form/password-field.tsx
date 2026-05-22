'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

import type { Control, FieldValues, Path } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface PasswordFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  helperText?: string
  className?: string
  required?: boolean
}

const PasswordField = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  className,
  ...props
}: PasswordFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex min-h-[58px] max-h-[58px] flex-col items-start  bg-sand px-2">
          {label && (
            <FormLabel className="flex items-center">
              {label}
              {props.required && (
                <span className="text-[18px] text-destructive">*</span>
              )}
            </FormLabel>
          )}
          <div className="relative w-full">
            <FormControl>
              <Input
                type={showPassword ? 'text' : 'password'}
                {...field}
                {...props}
                className={cn('pr-10', className)}
              />
            </FormControl>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-black" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4 text-black" aria-hidden="true" />
              )}
              <span className="sr-only">
                {showPassword ? 'Hide password' : 'Show password'}
              </span>
            </Button>
          </div>
          {helperText && <FormDescription>{helperText}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default PasswordField
