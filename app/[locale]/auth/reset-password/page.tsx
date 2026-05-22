'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import * as z from 'zod'

import { useAuth } from '@/contexts/auth-context'
import BaseFormComponent from '@/components/form/form-management/BaseFormComponent'
import type { FieldDefinition } from '@/components/form/form-management/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ThemeToggle } from '@/contexts/theme-context'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ShieldCheckIcon, AlertTriangleIcon } from 'lucide-react'

export default function ResetPasswordPage() {
  const { resetPassword, isLoading } = useAuth()
  const searchParams = useSearchParams()
  const [token, setToken] = useState<string>('')
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)

  // Get token from URL parameters
  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (tokenParam) {
      setToken(tokenParam)
      // In a real app, you would validate the token with your API
      // For demo, we'll just check if it's a reasonable length
      setTokenValid(tokenParam.length >= 10)
    } else {
      setTokenValid(false)
    }
  }, [searchParams])

  // Reset password form schema
  const resetPasswordSchema = z
    .object({
      password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    })

  // Form fields definition
  const resetPasswordFields: FieldDefinition[] = [
    {
      name: 'password',
      label: 'New Password',
      type: 'password',
      placeholder: 'Enter your new password',
      required: true,
      className: 'col-span-12',
      description:
        'Must be 8+ characters with uppercase, lowercase, and number',
    },
    {
      name: 'confirmPassword',
      label: 'Confirm New Password',
      type: 'password',
      placeholder: 'Confirm your new password',
      required: true,
      className: 'col-span-12',
    },
  ]

  const handleResetPassword = async (
    data: z.infer<typeof resetPasswordSchema>
  ) => {
    try {
      await resetPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })
    } catch (error) {
      // Error is handled in the auth context with toast
      console.error('Reset password error:', error)
    }
  }

  // Show error if no token or invalid token
  if (tokenValid === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-between items-center mb-6">
              <div className="flex-1" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Invalid Link
              </h1>
              <div className="flex-1 flex justify-end">
                <ThemeToggle />
              </div>
            </div>
          </div>

          <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <AlertTriangleIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-700 dark:text-red-300">
              This password reset link is invalid or has expired. Please request
              a new one.
            </AlertDescription>
          </Alert>

          <Card className="border-2">
            <CardContent className="pt-6 text-center space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                The password reset link you followed is not valid or has
                expired.
              </p>
              <div className="space-y-2">
                <Link
                  href="/auth/forgot-password"
                  className="inline-block w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Request New Reset Link
                </Link>
                <Link
                  href="/auth/login"
                  className="inline-block w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Show loading while validating token
  if (tokenValid === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Validating reset link...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Reset Password
            </h1>
            <div className="flex-1 flex justify-end">
              <ThemeToggle />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Create a new password for your account
          </p>
        </div>

        {/* Success Alert */}
        <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <ShieldCheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-sm text-green-700 dark:text-green-300">
            <strong>Link Verified:</strong> You can now set a new password for
            your account.
          </AlertDescription>
        </Alert>

        {/* Reset Password Form */}
        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">New Password</CardTitle>
            <CardDescription>
              Enter a strong password for your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BaseFormComponent
              schema={resetPasswordSchema}
              fields={resetPasswordFields}
              onSubmit={handleResetPassword}
              isLoading={isLoading}
              actionButtons={{
                submit: true,
                text: isLoading ? 'Updating...' : 'Update Password',
                className: 'col-span-12',
                submitClassName: 'w-full',
              }}
              toastConfig={{
                showSuccessToast: false, // Handled in auth context
                showErrorToast: false, // Handled in auth context
              }}
              handleSubmitInternally={false}
            />

            <div className="mt-6 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <p>Your password should be:</p>
                <ul className="list-disc list-inside text-left space-y-1">
                  <li>At least 8 characters long</li>
                  <li>Include uppercase and lowercase letters</li>
                  <li>Include at least one number</li>
                  <li>Unique and not used elsewhere</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            href="/auth/login"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
