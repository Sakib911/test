'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import type { Control, FieldValues, Path } from 'react-hook-form'

import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DateFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  placeholder?: string
  helperText?: string
}

const DateField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  helperText,
}: DateFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <div className="h-[58px] max-h-[58px] flex flex-col w-full rounded-none  bg-sand pl-3 text-left font-normal hover:text-black cursor-pointer">
                <FormLabel>{label}</FormLabel>
                <div className="flex items-center justify-between py-2">
                  <span
                    className={cn(
                      'text-sm',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value
                      ? format(new Date(field.value + 'T00:00:00'), 'PPP')
                      : placeholder || 'Pick a date'}
                  </span>
                  <CalendarIcon className="h-4 w-4 opacity-50" />
                </div>
              </div>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={
                field.value ? new Date(field.value + 'T00:00:00') : undefined
              }
              buttonVariant="default"
              onSelect={(date) => {
                // Convert date to local date string (YYYY-MM-DD) to avoid timezone issues
                if (date) {
                  const year = date.getFullYear()
                  const month = String(date.getMonth() + 1).padStart(2, '0')
                  const day = String(date.getDate()).padStart(2, '0')
                  const dateString = `${year}-${month}-${day}`
                  field.onChange(dateString)
                } else {
                  field.onChange('')
                }
              }}
              captionLayout="dropdown"
            />
          </PopoverContent>
        </Popover>
        {helperText && <FormDescription>{helperText}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
)
export default DateField
