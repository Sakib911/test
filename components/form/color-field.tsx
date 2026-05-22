'use client'

import { useState } from 'react'

import type { Control, FieldValues, Path } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface ColorFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  className?: string
  colorTypeableInputShow?: boolean
}

const ColorField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder = '#000000',
  helperText,
  disabled = false,
  required = false,
  className,
  colorTypeableInputShow = false,
}: ColorFieldProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)

  // Predefined color palette with brand and common colors
  const colorPalette = [
    // Grayscale
    '#000000',
    '#111827',
    '#374151',
    '#6b7280',
    '#9ca3af',
    '#d1d5db',
    '#e5e7eb',
    '#f3f4f6',
    '#f9fafb',
    '#ffffff',

    // Brand Colors (Current App)
    '#44ade2',
    '#0d2c40',
    '#58b11a',
    '#01377f',

    // Primary Colors
    '#ef4444',
    '#f97316',
    '#f59e0b',
    '#eab308',
    '#84cc16',
    '#22c55e',
    '#10b981',
    '#14b8a6',
    '#06b6d4',
    '#0ea5e9',
    '#3b82f6',
    '#6366f1',
    '#8b5cf6',
    '#a855f7',
    '#d946ef',
    '#ec4899',
    '#f43f5e',

    // Professional Colors
    '#1e40af',
    '#7c3aed',
    '#be185d',
    '#dc2626',
    '#ea580c',
    '#d97706',
  ]

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className="space-y-2">
              {/* Color Preview & Input Row */}
              <div className="flex items-center gap-3">
                {/* Color Preview & Picker */}
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-2 w-12 h-12 rounded-none shadow-sm hover:shadow-md transition-shadow"
                      disabled={disabled}
                      style={{
                        backgroundColor: field.value || '#ffffff',
                        borderColor: field.value ? field.value : '#d1d5db',
                      }}
                      title={`Current color: ${field.value || 'None'}`}
                    >
                      <span className="sr-only">Pick color</span>
                      {!field.value && (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                          ?
                        </div>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-3" align="end">
                    <div className="space-y-3">
                      <div className="text-sm font-medium">Choose Color</div>

                      {/* Color Palette Grid */}
                      <div className="grid grid-cols-6 gap-2">
                        {colorPalette.map((color) => (
                          <button
                            key={color}
                            type="button"
                            className={cn(
                              'w-8 h-8 rounded border-2 transition-all hover:scale-110',
                              field.value === color
                                ? 'border-primary ring-2 ring-primary/20'
                                : 'border-gray-300 hover:border-gray-400'
                            )}
                            style={{ backgroundColor: color }}
                            onClick={() => {
                              field.onChange(color)
                              setIsOpen(false)
                            }}
                            title={color}
                          />
                        ))}
                      </div>

                      {/* HTML5 Color Picker */}
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">
                          Or use color picker:
                        </div>
                        <input
                          type="color"
                          value={field.value || '#000000'}
                          onChange={(e) => {
                            field.onChange(e.target.value)
                          }}
                          className="w-full h-10 rounded border cursor-pointer"
                        />
                      </div>

                      {/* Clear Color */}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          field.onChange('')
                          setIsOpen(false)
                        }}
                      >
                        Clear Color
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                {colorTypeableInputShow && (
                  <Input
                    {...field}
                    type="text"
                    placeholder={placeholder}
                    disabled={disabled}
                    className="flex-1  text-sm h-12 "
                    onChange={(e) => {
                      let value = e.target.value
                      // Auto-add # if not present
                      if (value && !value.startsWith('#')) {
                        value = '#' + value
                      }
                      field.onChange(value)
                    }}
                  />
                )}
              </div>

              {/* Color Name Display */}
              {field.value && (
                <div className="text-xs text-muted-foreground">
                  {field.value}
                </div>
              )}
            </div>
          </FormControl>
          {helperText && (
            <p className="text-sm text-muted-foreground">{helperText}</p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ColorField
