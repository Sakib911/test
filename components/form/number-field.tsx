'use client'

import { useController } from 'react-hook-form'

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
import { cn } from '@/lib/utils'

interface NumberFieldProps<T extends FieldValues>
  extends Omit<React.ComponentProps<'input'>, 'onChange'> {
  name: Path<T>
  control: Control<T>
  label: string
  helperText?: string
  stepper?: boolean
  min?: number
  max?: number
  step?: number
}

const NumberField = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  stepper = true,
  className,
  min,
  max,
  step,
  ...props
}: NumberFieldProps<T>) => {
  const {
    field: { onChange, ...field },
  } = useController({
    name,
    control,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange(value === '' ? '' : Number(value))
  }

  const handleStep = (increment: number) => {
    const currentValue =
      typeof field.value === 'number' && !isNaN(field.value) ? field.value : 0
    onChange(currentValue + increment)
  }

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="flex h-[58px] max-h-[58px] w-full flex-col items-start  bg-sand px-2">
          <FormLabel className="flex items-center">
            {label}
            {props.required && (
              <span className="text-[18px] text-destructive">*</span>
            )}
          </FormLabel>
          <div className="relative w-full">
            <FormControl>
              <Input
                type="number"
                {...field}
                {...props}
                min={min}
                max={max}
                step={step}
                onChange={handleChange}
                className={cn({ 'pr-16 w-full': stepper }, className)}
              />
            </FormControl>
          </div>
          {helperText && <FormDescription>{helperText}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default NumberField
