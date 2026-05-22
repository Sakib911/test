import { jwtVerify } from 'jose'

import { GET_USER_PROFILE, ACCESS_TOKEN } from './Constants'
import { getAuthToken } from './cookies'

import api from '@/services/Api'

export async function verifyAuth(token: string) {
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-secret-key'
    )
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    throw new Error('Invalid token')
  }
}

export async function getSessionToken(request: Request) {
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader) return null

  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=')
    acc[key] = value
    return acc
  }, {} as Record<string, string>)

  return cookies[ACCESS_TOKEN]
}

export async function isAuthenticated(request: Request) {
  const token = await getSessionToken(request)
  if (!token) return false

  try {
    await verifyAuth(token)
    return true
  } catch {
    return false
  }
}

export interface UserProfile {
  id: string
  role: 'admin' | 'user' | 'moderator'
  email: string
  name: string
  avatar?: string
  [key: string]: unknown
}

export async function getUserProfileFromAPI(
  token: string
): Promise<UserProfile | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${GET_USER_PROFILE}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(5000),
      }
    )

    if (!response.ok) {
      console.error(
        'Failed to fetch user profile:',
        response.status,
        response.statusText
      )
      return null
    }

    const result = await response.json()

    if (result.success && result.data) {
      return result.data as UserProfile
    }

    return null
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

export function isAdminRoute(pathname: string): boolean {
  const adminRoutes = ['/admin', '/dashboard/users', '/bank']

  return adminRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )
}

export function isUserRoute(pathname: string): boolean {
  const userRoutes = ['/dashboard', '/profile', '/settings']

  // Exclude admin-only routes from user routes
  if (isAdminRoute(pathname)) {
    return false
  }

  return userRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )
}

export async function getUserProfile() {
  const token = await getAuthToken()
  if (token) {
    api.getSingleData({ url: GET_USER_PROFILE }, (res: any) => {
      if (res.success) {
        const data = res.data
        return data
      }
    })
  }
}
