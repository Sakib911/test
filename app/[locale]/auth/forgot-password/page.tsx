'use client'

import Link from 'next/link'
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
import { MailIcon } from 'lucide-react'

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading } = useAuth()

  // Forgot password form schema
  const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
  })

  // Form fields definition
  const forgotPasswordFields: FieldDefinition[] = [
    {
      name: 'email',
      label: 'email',
      type: 'email',
      placeholder: 'email',
      required: true,
      className: 'col-span-12',
      description: 'Enter the email address associated with your account',
    },
  ]

  const handleForgotPassword = async (
    data: z.infer<typeof forgotPasswordSchema>
  ) => {
    try {
      await forgotPassword({
        email: data.email,
      })
    } catch (error) {
      // Error is handled in the auth context with toast
      console.error('Forgot password error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Forgot Password
            </h1>
            <div className="flex-1 flex justify-end">
              <ThemeToggle />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your email to receive password reset instructions
          </p>
        </div>

        {/* Info Alert */}
        <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
          <MailIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          <AlertDescription className="text-sm text-orange-700 dark:text-orange-300">
            <strong>Demo Mode:</strong> Password reset emails won&apos;t
            actually be sent. In production, you would receive a real email with
            reset instructions.
          </AlertDescription>
        </Alert>

        {/* Forgot Password Form */}
        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>
              We&apos;ll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BaseFormComponent
              schema={forgotPasswordSchema}
              fields={forgotPasswordFields}
              onSubmit={handleForgotPassword}
              isLoading={isLoading}
              actionButtons={{
                submit: true,
                text: isLoading ? 'Sending...' : 'Send Reset Link',
                className: 'col-span-12',
                submitClassName: 'w-full',
              }}
              toastConfig={{
                showSuccessToast: false, // Handled in auth context
                showErrorToast: false, // Handled in auth context
              }}
              handleSubmitInternally={false}
            />

            <div className="mt-6 text-center space-y-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>
                  Remember your password?{' '}
                  <Link
                    href="/auth/login"
                    className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>
                  If you don&apos;t receive an email within 5 minutes, check
                  your spam folder or try again with a different email address.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <Card className="border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
