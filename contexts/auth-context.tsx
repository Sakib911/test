'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useLanguageSwitcher } from '@/hooks/use-language-switcher'

// Types for authentication
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user' | 'moderator'
  avatar?: string
  createdAt: string
  lastLoginAt?: string
  isEmailVerified: boolean
  preferences: {
    theme: 'light' | 'dark' | 'system'
    language: 'en' | 'de'
    notifications: boolean
  }
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignupData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export interface ForgotPasswordData {
  email: string
}

export interface ResetPasswordData {
  token: string
  password: string
  confirmPassword: string
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

interface AuthContextType extends AuthState {
  // Authentication methods
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => void
  forgotPassword: (data: ForgotPasswordData) => Promise<void>
  resetPassword: (data: ResetPasswordData) => Promise<void>
  changePassword: (data: ChangePasswordData) => Promise<void>

  // User management
  updateProfile: (data: Partial<User>) => Promise<void>
  refreshUser: () => Promise<void>

  // Utility methods
  hasRole: (role: string) => boolean
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data for demonstration
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-01-20T10:30:00Z',
    isEmailVerified: true,
    preferences: {
      theme: 'system',
      language: 'en',
      notifications: true,
    },
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    name: 'John Doe',
    role: 'user',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    createdAt: '2024-01-05T00:00:00Z',
    lastLoginAt: '2024-01-19T15:45:00Z',
    isEmailVerified: true,
    preferences: {
      theme: 'light',
      language: 'en',
      notifications: false,
    },
  },
  {
    id: '3',
    email: 'moderator@example.com',
    password: 'mod123',
    name: 'Jane Smith',
    role: 'moderator',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100',
    createdAt: '2024-01-03T00:00:00Z',
    isEmailVerified: true,
    preferences: {
      theme: 'dark',
      language: 'de',
      notifications: true,
    },
  },
]

// Mock storage keys
const AUTH_STORAGE_KEY = 'auth_user'
const TOKEN_STORAGE_KEY = 'auth_token'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })
  const router = useRouter()
  const { currentLocale } = useLanguageSwitcher()

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)
        const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)

        if (storedUser && storedToken) {
          const user = JSON.parse(storedUser)
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
          })
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          })
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        })
      }
    }

    initializeAuth()
  }, [])

  // Simulate API delay
  const simulateApiDelay = (ms = 1000) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  const login = async (credentials: LoginCredentials) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      // Simulate API call
      await simulateApiDelay(1500)

      // Find user by email and password
      const user = MOCK_USERS.find(
        (u) =>
          u.email === credentials.email && u.password === credentials.password
      )

      if (!user) {
        throw new Error('Invalid email or password')
      }

      // Remove password from user object
      const { password: _, ...userWithoutPassword } = user

      // Update last login time
      const updatedUser = {
        ...userWithoutPassword,
        lastLoginAt: new Date().toISOString(),
      }

      // Store in localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser))
      localStorage.setItem(TOKEN_STORAGE_KEY, `mock_token_${user.id}`)

      setAuthState({
        user: updatedUser,
        isLoading: false,
        isAuthenticated: true,
      })

      toast.success('Login successful!', {
        description: `Welcome back, ${updatedUser.name}!`,
      })

      // Redirect to dashboard
      router.push(`/${currentLocale}/dashboard`)
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      const message = error instanceof Error ? error.message : 'Login failed'
      toast.error('Login Failed', { description: message })
      throw error
    }
  }

  const signup = async (data: SignupData) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      // Simulate API call
      await simulateApiDelay(2000)

      // Check if user already exists
      const existingUser = MOCK_USERS.find((u) => u.email === data.email)
      if (existingUser) {
        throw new Error('User with this email already exists')
      }

      // Create new user
      const newUser: User = {
        id: `${Date.now()}`,
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        role: 'user',
        createdAt: new Date().toISOString(),
        isEmailVerified: false, // Would require email verification in real app
        preferences: {
          theme: 'system',
          language: 'en',
          notifications: true,
        },
      }

      // Store in localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser))
      localStorage.setItem(TOKEN_STORAGE_KEY, `mock_token_${newUser.id}`)

      setAuthState({
        user: newUser,
        isLoading: false,
        isAuthenticated: true,
      })

      toast.success('Account created successfully!', {
        description: `Welcome, ${newUser.name}!`,
      })

      // Redirect to dashboard
      router.push(`/${currentLocale}/dashboard`)
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      const message = error instanceof Error ? error.message : 'Signup failed'
      toast.error('Signup Failed', { description: message })
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem(TOKEN_STORAGE_KEY)

    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })

    toast.success('Logged out successfully')
    router.push(`/${currentLocale}`)
  }

  const forgotPassword = async (data: ForgotPasswordData) => {
    try {
      // Simulate API call
      await simulateApiDelay(1500)

      // Check if user exists
      const user = MOCK_USERS.find((u) => u.email === data.email)
      if (!user) {
        throw new Error('No account found with this email address')
      }

      toast.success('Password reset email sent!', {
        description: 'Check your email for reset instructions',
      })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Password reset failed'
      toast.error('Reset Failed', { description: message })
      throw error
    }
  }

  const resetPassword = async (data: ResetPasswordData) => {
    try {
      // Simulate API call
      await simulateApiDelay(1500)

      // In a real app, you'd verify the token here
      if (!data.token || data.token.length < 10) {
        throw new Error('Invalid or expired reset token')
      }

      toast.success('Password reset successfully!', {
        description: 'You can now login with your new password',
      })

      router.push(`/${currentLocale}/auth/login`)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Password reset failed'
      toast.error('Reset Failed', { description: message })
      throw error
    }
  }

  const changePassword = async (_data: ChangePasswordData) => {
    if (!authState.user) {
      throw new Error('User not authenticated')
    }

    try {
      // Simulate API call
      await simulateApiDelay(1500)

      // In a real app, you'd verify the current password
      toast.success('Password changed successfully!', {
        description: 'Your password has been updated',
      })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Password change failed'
      toast.error('Change Failed', { description: message })
      throw error
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!authState.user) {
      throw new Error('User not authenticated')
    }

    try {
      // Simulate API call
      await simulateApiDelay(1000)

      const updatedUser = { ...authState.user, ...data }

      // Update localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser))

      setAuthState((prev) => ({
        ...prev,
        user: updatedUser,
      }))

      toast.success('Profile updated successfully!')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Profile update failed'
      toast.error('Update Failed', { description: message })
      throw error
    }
  }

  const refreshUser = async () => {
    if (!authState.user) return

    try {
      // Simulate API call to refresh user data
      await simulateApiDelay(500)

      // In a real app, you'd fetch fresh user data from the API
      const refreshedUser = { ...authState.user }

      setAuthState((prev) => ({
        ...prev,
        user: refreshedUser,
      }))
    } catch (error) {
      console.error('Failed to refresh user:', error)
    }
  }

  const hasRole = (role: string): boolean => {
    return authState.user?.role === role
  }

  const hasPermission = (permission: string): boolean => {
    if (!authState.user) return false

    // Mock permission system based on roles
    const rolePermissions = {
      admin: ['read', 'write', 'delete', 'manage_users', 'manage_system'],
      moderator: ['read', 'write', 'moderate'],
      user: ['read'],
    }

    return rolePermissions[authState.user.role]?.includes(permission) || false
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword,
        changePassword,
        updateProfile,
        refreshUser,
        hasRole,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Export default mock users for testing
export { MOCK_USERS }
