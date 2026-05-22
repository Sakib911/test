export type FieldType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'asyncSelect'
  | 'password'
  | 'email'
  | 'number'
  | 'multi-select'
  | 'checkbox'
  | 'radio-group'
  | 'switch'
  | 'date'
  | 'date-range'
  | 'file-upload'
  | 'rich-text'
  | 'phone'
  | 'currency'
  | 'otp'
  | 'color'
  | 'slider'
  | 'custom'
  | 'phone-country'

export interface FieldDefinition {
  name: string
  label: string
  type: FieldType
  placeholder?: string
  disabled?: boolean
  className?: string
  required?: boolean
  description?: string
  fieldClassName?: string

  // Number field specific props
  min?: number
  max?: number
  step?: number

  // Textarea specific props
  rows?: number

  // File upload specific props
  accept?: string
  multiple?: boolean
  uploadApi?: boolean // Enable API upload
  uploadEndpoint?: string // Custom upload endpoint
  maxFileSize?: number // Max file size in MB
  useDefaultStyling?: boolean // Use simple default styling instead of dropzone
  showImageViewer?: boolean // Show image viewer modal (only for dropzone styling)
  showPreview?: boolean // Show preview modal (only for dropzone styling)

  // AsyncSelect specific props
  apiUrl?: string
  queryKey?: string
  optLabelKey?: string
  optValueKey?: string
  isMulti?: boolean
  isClearable?: boolean

  // Select specific props
  options?: Array<{ label: string; value: string }>

  // Phone field specific props
  defaultCountryCode?: string

  // Currency field specific props
  currency?: string
  currencySymbol?: string
  locale?: string
  allowNegative?: boolean

  // Conditional rendering
  condition?: (values: Record<string, unknown>) => boolean

  // Custom field specific props
  reactNode?: React.ReactNode
}
