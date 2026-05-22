'use client'

import { useState } from 'react'
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
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/contexts/theme-context'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'

// Demo accounts for testing
const DEMO_ACCOUNTS = [
  { email: 'admin@example.com', password: 'admin123', role: 'Admin' },
  { email: 'user@example.com', password: 'user123', role: 'User' },
  { email: 'moderator@example.com', password: 'mod123', role: 'Moderator' },
]

export default function LoginPage() {
  const { login, isLoading } = useAuth()
  const [showDemoAccounts, setShowDemoAccounts] = useState(false)

  // Login form schema
  const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rememberMe: z.boolean().optional(),
  })

  // Form fields definition
  const loginFields: FieldDefinition[] = [
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
    },
    {
      name: 'rememberMe',
      label: 'Remember me',
      type: 'checkbox',
      className: 'col-span-12 mt-4',
    },
  ]

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    try {
      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      })
    } catch (error) {
      // Error is handled in the auth context with toast
      console.error('Login error:', error)
    }
  }

  const handleDemoLogin = async (email: string, password: string) => {
    try {
      await login({ email, password })
    } catch (error) {
      console.error('Demo login error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome Back
            </h1>
            <div className="flex-1 flex justify-end">
              <ThemeToggle />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>

        {/* Demo Accounts Alert */}
        <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <AlertDescription className="text-sm">
            <div className="flex items-center justify-between">
              <span>Demo accounts available for testing</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDemoAccounts(!showDemoAccounts)}
                className="text-blue-600 dark:text-blue-400 h-auto p-1"
              >
                {showDemoAccounts ? 'Hide' : 'Show'}
              </Button>
            </div>
            {showDemoAccounts && (
              <div className="mt-3 space-y-2">
                {DEMO_ACCOUNTS.map((account) => (
                  <div
                    key={account.email}
                    className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded border"
                  >
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {account.role}
                      </Badge>
                      <span className="text-xs font-mono">{account.email}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleDemoLogin(account.email, account.password)
                      }
                      disabled={isLoading}
                      className="h-7 text-xs"
                    >
                      Use
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </AlertDescription>
        </Alert>

        {/* Login Form */}
        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BaseFormComponent
              schema={loginSchema}
              fields={loginFields}
              onSubmit={handleLogin}
              isLoading={isLoading}
              actionButtons={{
                submit: true,
                text: isLoading ? 'Signing in...' : 'Sign In',
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

              <div className="text-center space-y-2">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Forgot your password?
                </Link>
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
