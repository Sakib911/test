'use client'

import React, { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'

interface CustomAmountInputProps {
  value: number
  onChange: (value: number) => void
  minAmount: number
  maxAmount: number
  step: number
  className?: string
  disabled?: boolean
}

/**
 * CustomAmountInput Component
 *
 * A reusable component for custom amount input with increment/decrement controls.
 * Follows Single Responsibility Principle by only handling amount input logic.
 */
const CustomAmountInput: React.FC<CustomAmountInputProps> = ({
  value,
  onChange,
  minAmount,
  maxAmount,
  step,
  className,
  disabled = false,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value.toString())

  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }, [])

  const validateAndSetValue = useCallback(
    (newValue: number) => {
      const clampedValue = Math.max(minAmount, Math.min(maxAmount, newValue))
      onChange(clampedValue)
      return clampedValue
    },
    [minAmount, maxAmount, onChange]
  )

  const handleIncrement = useCallback(() => {
    if (disabled) return
    const newValue = validateAndSetValue(value + step)
    setEditValue(newValue.toString())
  }, [value, step, validateAndSetValue, disabled])

  const handleDecrement = useCallback(() => {
    if (disabled) return
    const newValue = validateAndSetValue(value - step)
    setEditValue(newValue.toString())
  }, [value, step, validateAndSetValue, disabled])

  const handleEditClick = useCallback(() => {
    if (disabled) return
    setIsEditing(true)
    setEditValue(value.toString())
  }, [disabled, value])

  const handleEditBlur = useCallback(() => {
    setIsEditing(false)
    const numericValue = parseFloat(editValue) || minAmount
    const validatedValue = validateAndSetValue(numericValue)
    setEditValue(validatedValue.toString())
  }, [editValue, minAmount, validateAndSetValue])

  const handleEditKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleEditBlur()
      } else if (e.key === 'Escape') {
        setIsEditing(false)
        setEditValue(value.toString())
      }
    },
    [handleEditBlur, value]
  )

  const handleEditChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditValue(e.target.value)
    },
    []
  )

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDecrement}
        disabled={disabled || value <= minAmount}
        className="h-8 w-8 p-0 rounded-full"
        aria-label="Decrease amount"
      >
        <Minus className="w-4 h-4" />
      </Button>

      <div
        className="flex items-center gap-1 cursor-pointer min-w-0 flex-1"
        onClick={handleEditClick}
      >
        {isEditing ? (
          <input
            type="number"
            value={editValue}
            onChange={handleEditChange}
            onBlur={handleEditBlur}
            onKeyDown={handleEditKeyDown}
            min={minAmount}
            max={maxAmount}
            step={step}
            className="text-2xl font-bold text-green-600 bg-transparent border-none outline-none w-full"
            autoFocus
          />
        ) : (
          <span className="text-2xl font-bold text-green-600 truncate">
            {formatCurrency(value)}
          </span>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleIncrement}
        disabled={disabled || value >= maxAmount}
        className="h-8 w-8 p-0 rounded-full"
        aria-label="Increase amount"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  )
}

export default CustomAmountInput
