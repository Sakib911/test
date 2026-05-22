'use client'

export const dynamic = 'force-dynamic'

import * as z from 'zod'

import { useAuth } from '@/contexts/auth-context'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import BaseFormComponent from '@/components/form/form-management/BaseFormComponent'
import type { FieldDefinition } from '@/components/form/form-management/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ShieldCheckIcon, AlertTriangleIcon } from 'lucide-react'

export default function ChangePasswordPage() {
  const { changePassword, isLoading, user } = useAuth()

  // Change password form schema
  const changePasswordSchema = z
    .object({
      currentPassword: z.string().min(1, 'Current password is required'),
      newPassword: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
      message: 'New password must be different from current password',
      path: ['newPassword'],
    })

  // Form fields definition
  const changePasswordFields: FieldDefinition[] = [
    {
      name: 'currentPassword',
      label: 'Current Password',
      type: 'password',
      placeholder: 'Enter your current password',
      required: true,
      className: 'col-span-12',
      description: 'Your existing password',
    },
    {
      name: 'newPassword',
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
      description: 'Re-enter your new password',
    },
  ]

  const handleChangePassword = async (
    data: z.infer<typeof changePasswordSchema>
  ) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      })

      // Reset form after successful password change
      // This would typically be handled by the form component
    } catch (error) {
      // Error is handled in the auth context with toast
      console.error('Change password error:', error)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Change Password
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Update your account password to keep your account secure
          </p>
        </div>

        {/* Security Alert */}
        <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <ShieldCheckIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Security Tips:</strong> Choose a strong password that you
            haven&apos;t used before. Avoid using personal information or common
            words.
          </AlertDescription>
        </Alert>

        {/* User Info */}
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-lg">Account Information</CardTitle>
            <CardDescription>
              You&apos;re changing the password for this account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Email:
                </span>
                <span className="text-sm font-medium">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Last Login:
                </span>
                <span className="text-sm font-medium">
                  {user?.lastLoginAt
                    ? new Date(user.lastLoginAt).toLocaleDateString()
                    : 'Never'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Change Password Form */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Update Password</CardTitle>
            <CardDescription>
              Enter your current password and choose a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BaseFormComponent
              schema={changePasswordSchema}
              fields={changePasswordFields}
              onSubmit={handleChangePassword}
              isLoading={isLoading}
              actionButtons={{
                submit: true,
                text: isLoading ? 'Updating...' : 'Update Password',
                reset: true,
                className: 'col-span-12 grid grid-cols-2 gap-4',
                submitClassName: 'col-span-1',
                resetClassName: 'col-span-1',
              }}
              toastConfig={{
                showSuccessToast: false, // Handled in auth context
                showErrorToast: false, // Handled in auth context
              }}
              handleSubmitInternally={false}
            />

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Password Requirements:
              </h4>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                  At least 8 characters long
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                  Include uppercase and lowercase letters
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                  Include at least one number
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                  Different from your current password
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                  Avoid using personal information
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
          <AlertTriangleIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-sm text-amber-700 dark:text-amber-300">
            <strong>Important:</strong> After changing your password, you may
            need to sign in again on other devices. Keep your new password
            secure and don&apos;t share it with anyone.
          </AlertDescription>
        </Alert>
      </div>
    </DashboardLayout>
  )
}
