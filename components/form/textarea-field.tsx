import type { Control, FieldValues, Path } from 'react-hook-form'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

interface TextareaFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  helperText?: string
  className?: string
  required?: boolean
}

const TextareaField = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...props
}: TextareaFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem
        className={`flex h-auto flex-col items-start  bg-sand px-2 ${props.className}`}
      >
        {label && (
          <FormLabel className="flex items-center">
            {label}
            {props.required && (
              <span className="text-[18px] text-destructive">*</span>
            )}
          </FormLabel>
        )}
        <FormControl>
          <Textarea {...field} {...props} />
        </FormControl>
        {helperText && <FormDescription>{helperText}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
)

export default TextareaField
