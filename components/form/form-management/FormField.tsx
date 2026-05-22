import { useTranslations } from 'next-intl'
import { memo } from 'react'
import * as React from 'react'

import CheckboxField from '../checkbox-field'
import ColorField from '../color-field'
import CurrencyField from '../currency-field'
import DateField from '../date-field'
import DateRangeField from '../date-range-field'
import EnhancedFileUploadField from '../enhanced-file-upload-field'
import FileUploadField from '../file-upload-field'
import InputField from '../input-field'
import MultiSelectField from '../multi-select-field'
import NumberField from '../number-field'
import PasswordField from '../password-field'
import PhoneCountryField from '../phone-country-field'
import RadioGroupField from '../radio-group-field'
import SelectField from '../select-field'
import SwitchField from '../switch-field'
import TextareaField from '../textarea-field'

import type { FieldDefinition } from './types'
import type { Control, FieldValues } from 'react-hook-form'

interface FormFieldProps {
  field: FieldDefinition
  control: Control<FieldValues>
  isLoading?: boolean
  resetKey?: string | number
}

const FormField = ({ field, control, isLoading }: FormFieldProps) => {
  const t = useTranslations()

  const commonProps = {
    name: field.name,
    control,
    label: field.label ? t(`forms.labels.${field.label}`) : '',
    placeholder: field.placeholder
      ? t(`forms.placeholders.${field.placeholder}`)
      : '',
    helperText: field.description ? t(`forms.labels.${field.description}`) : '',
    disabled: field.disabled || isLoading,
    required: field?.required || false,
    className: field.className,
  }

  const translateOptions = (options: { label: string; value: string }[] = []) =>
    options.map((opt) => {
      // For now, just return the original label to avoid translation errors
      // TODO: Add proper translations to messages/en.json and messages/de.json
      return { ...opt, label: opt.label }
    })

  const fieldComponents = {
    input: <InputField {...commonProps} className={field?.fieldClassName} />,
    textarea: (
      <TextareaField {...commonProps} className={field?.fieldClassName} />
    ),
    select: (
      <SelectField
        {...commonProps}
        options={translateOptions(field.options || [])}
      />
    ),
    password: <PasswordField {...commonProps} />,
    email: <InputField {...commonProps} className={field?.fieldClassName} />,
    number: (
      <NumberField
        {...commonProps}
        min={field.min}
        max={field.max}
        step={field.step}
        className={field?.fieldClassName}
      />
    ),
    currency: (
      <CurrencyField
        {...commonProps}
        currency={field.currency}
        currencySymbol={field.currencySymbol}
        locale={field.locale}
        allowNegative={field.allowNegative}
      />
    ),
    'phone-country': (
      <PhoneCountryField
        {...commonProps}
        defaultCountry={field.defaultCountryCode}
      />
    ),
    'multi-select': (
      <MultiSelectField
        {...commonProps}
        options={translateOptions(field.options || [])}
        className={field?.fieldClassName}
      />
    ),
    checkbox: (
      <CheckboxField {...commonProps} className={field?.fieldClassName} />
    ),
    'radio-group': (
      <RadioGroupField
        {...commonProps}
        options={translateOptions(field.options || [])}
        className={field?.fieldClassName}
      />
    ),
    switch: <SwitchField {...commonProps} className={field?.fieldClassName} />,
    color: <ColorField {...commonProps} className={field?.fieldClassName} />,
    date: <DateField {...commonProps} />,
    'date-range': <DateRangeField {...commonProps} />,
    'file-upload': field.uploadApi ? (
      <EnhancedFileUploadField
        {...commonProps}
        accept={field.accept}
        multiple={field.multiple}
        uploadApi={field.uploadApi}
        uploadEndpoint={field.uploadEndpoint}
        maxFileSize={field.maxFileSize}
        useDefaultStyling={field.useDefaultStyling}
        showImageViewer={field.showImageViewer}
        showPreview={field.showPreview}
      />
    ) : (
      <FileUploadField
        {...commonProps}
        accept={field.accept}
        multiple={field.multiple}
      />
    ),

    // Custom field that renders a React node
    custom: field.reactNode as React.ReactElement,
    // Fallbacks for unhandled types
    asyncSelect: (
      <SelectField
        {...commonProps}
        options={translateOptions(field.options || [])}
      />
    ),
  }

  const component = fieldComponents[field.type as keyof typeof fieldComponents]

  if (!component) {
    console.error(`Unsupported field type: ${field.type}`)
    return null
  }

  // Conditional rendering based on field definition
  if (field.condition && !field.condition(control._formValues)) {
    return null
  }

  return component
}

export default memo(FormField)
