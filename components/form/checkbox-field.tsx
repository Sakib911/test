'use client'

import type * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import type { Control, FieldValues, Path } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'

interface CheckboxFieldProps<T extends FieldValues>
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  name: Path<T>
  control: Control<T>
  label: string
  helperText?: string
}

const CheckboxField = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...props
}: CheckboxFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
            {...props}
          />
        </FormControl>
        <div className="space-y-1 leading-none">
          <FormLabel>{label}</FormLabel>
          {helperText && <FormDescription>{helperText}</FormDescription>}
        </div>
      </FormItem>
    )}
  />
)

export default CheckboxField
