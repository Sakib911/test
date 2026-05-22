import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { z } from 'zod'

import type { FieldDefinition } from '@/components/form/form-management'

// Login Form Fields
export const useLoginFields = (
  setSetLogInWithPassword?: React.Dispatch<React.SetStateAction<boolean>>,
  pathName?: string
): FieldDefinition[] => {
  const [loginWithPassword, setLoginWithPassword] = useState(false)
  const router = useRouter()
  return [
    {
      name: 'email',
      label: 'email',
      type: 'email',
      placeholder: 'email',
      required: true,
      className: 'col-span-12',
    },
    ...(loginWithPassword
      ? [
          {
            name: 'password',
            label: 'password',
            className: 'col-span-12',
            type: 'password' as const,
            placeholder: 'password',
            required: true,
          },
          {
            name: 'forgot_password_link',
            className: 'col-span-12',
            label: '',
            type: 'custom' as const,
            reactNode: (
              <div className="text-right">
                <span
                  className="text-primary underline cursor-pointer text-sm"
                  onClick={() => {
                    router.push('/forgot-password')
                  }}
                >
                  Forgot Password?
                </span>
              </div>
            ),
          } as const,
        ]
      : []),
    ...(!loginWithPassword
      ? [
          {
            name: 'custom_field',
            className: 'col-span-12',
            label: '',
            type: 'custom' as const,
            reactNode: (
              <div className="cursor-pointer">
                {pathName?.includes('/login') && (
                  <h2>
                    Login with{' '}
                    <span
                      className="text-primary underline"
                      onClick={() => {
                        setLoginWithPassword(true)
                        setSetLogInWithPassword?.(true)
                      }}
                    >
                      password?
                    </span>
                  </h2>
                )}
              </div>
            ),
          } as const,
        ]
      : []),
  ]
}

// OTP Verification Form Fields
export const useOtpVerificationFields = (): FieldDefinition[] => [
  {
    name: 'otp',
    label: 'otp',
    type: 'input',
    placeholder: 'Enter OTP',
    required: true,
    className: 'text-lg col-span-12',
  },
]

// Forgot Password Form Fields
export const useForgotPasswordFields = (_t?: unknown): FieldDefinition[] => [
  {
    name: 'email',
    label: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
    className: 'col-span-12',
  },
]

// Registration Step Fields (basic examples)
export const useRegistrationStepOneFields = (): FieldDefinition[] => [
  {
    name: 'email',
    label: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
    className: 'col-span-12',
  },
  {
    name: 'amount',
    label: 'amount',
    type: 'input',
    placeholder: 'Enter amount',
    required: true,
    className: 'col-span-12',
  },
  {
    name: 'option',
    label: 'option',
    type: 'select',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
    placeholder: 'Select option',
    required: true,
    className: 'col-span-12',
  },
  {
    name: 'duration',
    label: 'duration',
    type: 'select',
    options: [
      { label: '1 Month', value: '1' },
      { label: '3 Months', value: '3' },
      { label: '6 Months', value: '6' },
      { label: '12 Months', value: '12' },
    ],
    placeholder: 'Select duration',
    required: true,
    className: 'col-span-12',
  },
]

export const useRegistrationStepTwoFields = (): FieldDefinition[] => [
  {
    name: 'firstName',
    label: 'firstName',
    type: 'input',
    placeholder: 'Enter first name',
    required: true,
    className: 'col-span-6',
  },
  {
    name: 'lastName',
    label: 'lastName',
    type: 'input',
    placeholder: 'Enter last name',
    required: true,
    className: 'col-span-6',
  },
  {
    name: 'phone',
    label: 'phone',
    type: 'input',
    placeholder: 'Enter phone number',
    required: true,
    className: 'col-span-12',
  },
]

// Reset Password Form Fields
export const useResetPasswordFields = (_t?: unknown): FieldDefinition[] => [
  {
    name: 'otp',
    label: 'otp',
    type: 'input',
    placeholder: 'Enter OTP',
    required: true,
    className: 'col-span-12',
  },
  {
    name: 'newPassword',
    label: 'newPassword',
    type: 'password',
    placeholder: 'Enter new password',
    required: true,
    className: 'col-span-12',
  },
]

// Basic Registration Fields (generic)
export const useRegistrationFields = (): FieldDefinition[] => [
  {
    name: 'email',
    label: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
    className: 'col-span-12',
  },
  {
    name: 'password',
    label: 'password',
    type: 'password',
    placeholder: 'Enter password',
    required: true,
    className: 'col-span-12',
  },
  {
    name: 'confirmPassword',
    label: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm password',
    required: true,
    className: 'col-span-12',
  },
]

// Password Change Fields
export const usePasswordChangeFields = (): FieldDefinition[] => [
  {
    name: 'currentPassword',
    label: 'currentPassword',
    type: 'password',
    placeholder: 'Enter current password',
    required: true,
    className: 'col-span-12',
  },
  {
    name: 'newPassword',
    label: 'newPassword',
    type: 'password',
    placeholder: 'Enter new password',
    required: true,
    className: 'col-span-12',
  },
  {
    name: 'confirmNewPassword',
    label: 'confirmNewPassword',
    type: 'password',
    placeholder: 'Confirm new password',
    required: true,
    className: 'col-span-12',
  },
]

// Schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().optional(),
})

export const registrationSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export const resetPasswordSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must contain only numbers'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
})

export const passwordChangeSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, 'Current password must be at least 8 characters'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters'),
    confirmNewPassword: z
      .string()
      .min(8, 'Confirm password must be at least 8 characters'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  })

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must contain only numbers'),
})
