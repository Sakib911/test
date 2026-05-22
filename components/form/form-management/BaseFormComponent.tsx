'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect, useState, useMemo } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import FormField from './FormField'

import type { FieldDefinition } from './types'
import type { Card } from '@/components/ui/card'
import type {
  DefaultValues,
  FieldValues,
  FormProviderProps,
  SubmitHandler,
} from 'react-hook-form'
import type { z } from 'zod'
import type { Control } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export interface FormState<T> {
  values: T
  isDirty: boolean
  isValid: boolean
}

interface ExtendedCardProps
  extends Omit<React.ComponentProps<typeof Card>, 'title'> {
  title?: React.ReactNode
  extra?: React.ReactNode
}

interface BaseFormComponentProps<T extends z.ZodType> {
  schema: T
  fields: FieldDefinition[]
  onSubmit?: (_data: z.infer<T>) => void
  onChange?: (_state: FormState<z.infer<T>>) => void
  className?: string
  cardProps?: ExtendedCardProps
  formProps?: {
    gridClassName?: string
    disabled?: boolean
  }
  actionButtons?: {
    submit?: boolean
    reset?: boolean
    text?: string
    loadingText?: string
    icon?: React.ReactNode
    submitClassName?: string
    className?: string
    resetClassName?: string
    layoutClassName?: string
  }
  extraButtons?: {
    key: string
    text: string
    type?: 'submit' | 'button'
    variant?: 'default' | 'secondary' | 'outline'
    className?: string
    onClick?: () => void
    loadingText?: string
  }[]
  isLoading?: boolean
  defaultValues?: DefaultValues<z.infer<T>>
  beforeSubmit?: (
    _data: z.infer<T>
  ) => z.infer<T> | false | Promise<z.infer<T> | false>
  afterSubmit?: (_data: z.infer<T>, _result?: unknown) => void
  toastConfig?: {
    showSuccessToast?: boolean
    successTitle?: string
    successMessage?: string
    showErrorToast?: boolean
    errorTitle?: string
    errorMessage?: string
  }
  handleSubmitInternally?: boolean
}
const BaseFormComponent = <T extends z.ZodType>({
  schema,
  fields,
  onSubmit,
  onChange,
  className = '',
  cardProps,
  formProps,
  actionButtons = { submit: true },
  extraButtons,
  isLoading = false,
  defaultValues,
  beforeSubmit,
  afterSubmit,
  toastConfig = {
    showSuccessToast: false,
    successTitle: 'Success',
    successMessage: 'Operation completed successfully',
    showErrorToast: false,
    errorTitle: 'Error',
    errorMessage: 'An error occurred',
  },
  handleSubmitInternally = false,
}: BaseFormComponentProps<T>) => {
  const [internalLoading, setInternalLoading] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const [isDateFieldInteraction, setIsDateFieldInteraction] = useState(false)

  const loading = isLoading || internalLoading
  const { toast } = useToast()
  const t = useTranslations()

  // Filter out custom fields for form state management (memoized to prevent infinite loops)
  const formFields = useMemo(
    () => fields.filter((field) => field.type !== 'custom'),
    [fields]
  )

  // Memoize default values to prevent infinite re-renders
  const memoizedDefaultValues = useMemo(
    () => ({
      ...(formFields
        ? Object.fromEntries(formFields.map((field) => [field.name, '']))
        : {}),
      ...(defaultValues || {}),
    }),
    [formFields, defaultValues]
  )

  const formMethods = useForm({
    resolver: zodResolver(schema as z.ZodType<FieldValues, FieldValues>),
    mode: 'onSubmit',
    defaultValues: memoizedDefaultValues,
  })

  const {
    control,
    formState: { isDirty, isValid, errors },
    watch,
    reset,
  } = formMethods

  // Reset form when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      reset(memoizedDefaultValues)
    }
  }, [defaultValues, memoizedDefaultValues, reset])

  // Watch all fields
  const watchAllFields = watch()
  // Call onChange when form values change
  useEffect(() => {
    if (onChange) {
      onChange({
        values: watchAllFields as z.infer<T>,
        isDirty,
        isValid,
      })
    }
  }, [onChange, watchAllFields, isDirty, isValid])

  // Debug logging (can be removed in production)
  if (
    process.env.NODE_ENV === 'development' &&
    Object.keys(errors).length > 0
  ) {
    console.warn('Form Validation Errors:', errors)
  }
  // Handle form submission
  const handleFormSubmit = async (data: z.infer<T>) => {
    try {
      // Execute beforeSubmit if provided
      if (beforeSubmit) {
        setInternalLoading(true)
        const modifiedData = await beforeSubmit(data)
        if (modifiedData === false) {
          setInternalLoading(false)
          return // Cancel submission
        }
        data = modifiedData || data
      }

      // Execute onSubmit if provided
      if (onSubmit) {
        if (handleSubmitInternally) {
          setInternalLoading(true)
          try {
            const result = await Promise.resolve(onSubmit(data))

            // Show success toast if configured
            if (toastConfig.showSuccessToast) {
              toast(toastConfig.successMessage || t('common.success'), {
                type: 'success',
              })
            }

            // Execute afterSubmit callback if provided
            if (afterSubmit) {
              afterSubmit(data, result)
            }
          } catch (error) {
            // Show error toast if configured
            if (toastConfig.showErrorToast) {
              toast(
                error instanceof Error
                  ? error.message
                  : toastConfig.errorMessage || t('common.error'),
                { type: 'error' }
              )
            }
            console.error('Form submission error:', error)
          } finally {
            setInternalLoading(false)
          }
        } else {
          // Just call onSubmit without handling loading/toasts internally
          onSubmit(data)
        }
      } else if (handleSubmitInternally && afterSubmit) {
        // If no onSubmit but afterSubmit is provided
        afterSubmit(data, reset)
      }
    } catch (error) {
      console.error('Form processing error:', error)
      setInternalLoading(false)

      // Show error toast if configured
      if (toastConfig.showErrorToast) {
        toast(
          error instanceof Error
            ? error.message
            : toastConfig.errorMessage || t('common.error'),
          { type: 'error' }
        )
      }
    }
  }

  // Using useMemo here will memoize the rendered fields, so the renderFields array
  // will only be recalculated when its dependencies change (fields, control, loading, resetKey).
  // This can help prevent unnecessary re-renders of the FormField components,
  // especially if the parent component re-renders frequently but the fields and related props do not change.

  const formContent = useMemo(
    () => (
      <div className={cn('grid grid-cols-12 gap-4')}>
        {fields?.map((field, index) => (
          <div
            key={field.name || `field-${index}`}
            className={field.className || 'col-span-12'}
          >
            <FormField
              field={field}
              control={control as Control<FieldValues>}
              isLoading={loading}
              resetKey={resetKey}
            />
          </div>
        ))}
        <div
          className={`col-span-12 grid  gap-6 ${
            actionButtons.layoutClassName || 'grid-cols-2'
          }`}
        >
          {actionButtons.submit && (
            <Button
              type="submit"
              className={cn(
                'col-span-12',
                actionButtons.submitClassName,
                actionButtons.className
              )}
              variant="default"
              disabled={loading}
            >
              {loading
                ? actionButtons.loadingText || t('common.loading')
                : actionButtons.text || t('common.submit')}
            </Button>
          )}

          {actionButtons.reset && (
            <Button
              variant="secondary"
              onClick={() => {
                reset()
                setResetKey((prev) => prev + 1)
              }}
              disabled={loading}
              className={cn('col-span-12', actionButtons.resetClassName)}
            >
              {t('common.reset')}
            </Button>
          )}

          {extraButtons?.map((btn) => (
            <Button
              key={btn.key}
              type={btn.type || 'button'}
              variant={btn.variant || 'default'}
              onClick={btn.onClick}
              disabled={
                loading || (btn.type === 'submit' && (!isDirty || !isValid))
              }
              className={cn('col-span-12 grid', btn.className)}
            >
              {loading && btn.type === 'submit'
                ? btn.loadingText || t('common.loading')
                : btn.text}
            </Button>
          ))}
        </div>
      </div>
    ),
    [
      fields,
      actionButtons.layoutClassName,
      actionButtons.submit,
      actionButtons.submitClassName,
      actionButtons.className,
      actionButtons.loadingText,
      actionButtons.text,
      actionButtons.reset,
      actionButtons.resetClassName,
      loading,
      t,
      extraButtons,
      control,
      resetKey,
      reset,
      isDirty,
      isValid,
    ]
  )

  const content = (
    <FormProvider
      {...(formMethods as unknown as FormProviderProps<FieldValues>)}
    >
      <form
        onSubmit={(e) => {
          // Check if this is an unwanted submission (no submitter means not from submit button)
          if (!(e.nativeEvent as SubmitEvent).submitter) {
            e.preventDefault()
            return
          }

          // Prevent submission if it's a date field interaction
          if (isDateFieldInteraction) {
            e.preventDefault()
            setIsDateFieldInteraction(false)
            return
          }

          return formMethods.handleSubmit(
            handleFormSubmit as unknown as SubmitHandler<unknown>
          )(e)
        }}
      >
        <fieldset disabled={formProps?.disabled || loading}>
          {formContent}
        </fieldset>
      </form>
    </FormProvider>
  )

  if (cardProps) {
    const { title, extra } = cardProps
    return (
      <>
        {title && <div className="mb-4">{title}</div>}
        {content}
        {extra && <div className="mt-4">{extra}</div>}
      </>
    )
  }

  return <div className={className}>{content}</div>
}

export default BaseFormComponent
