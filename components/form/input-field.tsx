'use client'

import type { Control, FieldValues, Path } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  helperText?: string
  required?: boolean
  className?: string
}

const InputField = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...props
}: InputFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => {
      return (
        <FormItem className="flex h-[58px] max-h-[58px] flex-col items-start  bg-sand px-2">
          {label && (
            <FormLabel className="flex items-center">
              {label}
              {props.required && (
                <span className="text-[18px] text-destructive">*</span>
              )}
            </FormLabel>
          )}
          <FormControl className="h-full">
            <Input {...field} {...props} />
          </FormControl>
          {helperText && <FormDescription>{helperText}</FormDescription>}
          <FormMessage />
        </FormItem>
      )
    }}
  />
)

export default InputField
