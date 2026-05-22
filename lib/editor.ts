// constants/editor.ts

export const TEMPLATE_VARIABLES: Array<{ name: string; value: string }> = [
  { name: 'Recipient Name', value: '{{recipientName}}' },
  { name: 'Email', value: '{{email}}' },
  { name: 'Company', value: '{{company}}' },
  { name: 'Phone', value: '{{phone}}' },
  { name: 'Date', value: '{{date}}' },
  { name: 'Time', value: '{{time}}' },
  { name: 'Reset Link', value: '{{resetLink}}' },
  { name: 'Verification Code', value: '{{otp}}' },
  { name: 'Support Email', value: '{{supportEmail}}' },
]

export const FONT_SIZES: Array<{ name: string; value: string; px: string }> = [
  { name: 'Small', value: '1', px: '10px' },
  { name: 'Normal', value: '3', px: '14px' },
  { name: 'Medium', value: '4', px: '18px' },
  { name: 'Large', value: '5', px: '24px' },
  { name: 'Extra Large', value: '6', px: '32px' },
  { name: 'Huge', value: '7', px: '48px' },
]

export const PRESET_COLORS: string[] = [
  '#000000',
  '#333333',
  '#666666',
  '#999999',
  '#CCCCCC',
  '#FFFFFF',
  '#FF0000',
  '#FF6600',
  '#FFCC00',
  '#00FF00',
  '#0066FF',
  '#6600FF',
  '#FF0066',
  '#FF3366',
  '#66FF00',
  '#00FFFF',
  '#0033FF',
  '#9900FF',
]
