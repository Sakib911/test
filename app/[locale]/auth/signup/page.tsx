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
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/contexts/theme-context'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { InfoIcon } from 'lucide-react'

export default function SignupPage() {
  const { signup, isLoading } = useAuth()

  // Signup form schema
  const signupSchema = z
    .object({
      firstName: z.string().min(2, 'First name must be at least 2 characters'),
      lastName: z.string().min(2, 'Last name must be at least 2 characters'),
      email: z.string().email('Invalid email address'),
      password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
      confirmPassword: z.string(),
      acceptTerms: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms and conditions',
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    })

  // Form fields definition
  const signupFields: FieldDefinition[] = [
    {
      name: 'firstName',
      label: 'firstName',
      type: 'input',
      placeholder: 'firstName',
      required: true,
      className: 'col-span-6',
    },
    {
      name: 'lastName',
      label: 'lastName',
      type: 'input',
      placeholder: 'lastName',
      required: true,
      className: 'col-span-6',
    },
    {
      name: 'email',
      label: 'email',
      type: 'email',
      placeholder: 'email',
      required: true,
      className: 'col-span-12',
    },
    {
      name: 'password',
      label: 'password',
      type: 'password',
      placeholder: 'password',
      required: true,
      className: 'col-span-12',
      description:
        'Must be 8+ characters with uppercase, lowercase, and number',
    },
    {
      name: 'confirmPassword',
      label: 'confirmPassword',
      type: 'password',
      placeholder: 'confirmPassword',
      required: true,
      className: 'col-span-12',
    },
    {
      name: 'acceptTerms',
      label: 'terms',
      type: 'checkbox',
      required: true,
      className: 'col-span-12',
    },
  ]

  const handleSignup = async (data: z.infer<typeof signupSchema>) => {
    try {
      await signup({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        acceptTerms: data.acceptTerms,
      })
    } catch (error) {
      // Error is handled in the auth context with toast
      console.error('Signup error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create Account
            </h1>
            <div className="flex-1 flex justify-end">
              <ThemeToggle />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Sign up to get started with our platform
          </p>
        </div>

        {/* Info Alert */}
        <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <InfoIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-sm text-green-700 dark:text-green-300">
            <strong>Demo Mode:</strong> Your account will be created with mock
            data. In production, this would create a real account and send
            verification emails.
          </AlertDescription>
        </Alert>

        {/* Signup Form */}
        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Create your account to access all features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BaseFormComponent
              schema={signupSchema}
              fields={signupFields}
              onSubmit={handleSignup}
              isLoading={isLoading}
              actionButtons={{
                submit: true,
                text: isLoading ? 'Creating account...' : 'Create Account',
                className: 'col-span-12',
                submitClassName: 'w-full',
              }}
              toastConfig={{
                showSuccessToast: false, // Handled in auth context
                showErrorToast: false, // Handled in auth context
              }}
              handleSubmitInternally={false}
            />

            <div className="mt-4">
              <Separator className="my-4" />

              <div className="text-center text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <p>
                  By creating an account, you agree to our{' '}
                  <Link
                    href="/terms"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign In Link */}
        <Card className="border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Sign in here
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
