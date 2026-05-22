'use client'

import Cookies from 'js-cookie'

import {
  ACCESS_TOKEN as AUTH_TOKEN_KEY,
  REFRESH_TOKEN as REFRESH_TOKEN_KEY,
} from './Constants'

/**
 * Cookie utility functions for authentication
 * Provides type-safe methods to get, set, and remove cookies
 */

// Default cookie options
const DEFAULT_OPTIONS = {
  expires: 7, // 7 days
  path: '/',
  secure: false, // Allow cookies in development
  sameSite: 'lax' as const, // Less restrictive for development
}

/**
 * Set authentication token in cookies
 * @param value - The token value to store
 * @param options - Cookie options (optional)
 */
export function setAuthToken(value: string, options = {}): void {
  Cookies.set(AUTH_TOKEN_KEY, value, { ...DEFAULT_OPTIONS, ...options })
}

/**
 * Get authentication token from cookies
 * @returns The token value or undefined if not found
 */
export function getAuthToken(): string | undefined {
  return Cookies.get(AUTH_TOKEN_KEY)
}

/**
 * Remove authentication token from cookies
 */
export function removeAuthToken(): void {
  Cookies.remove(AUTH_TOKEN_KEY, { path: '/' })
}

/**
 * Set refresh token in cookies
 * @param value - The refresh token value to store
 * @param options - Cookie options (optional)
 */
export function setRefreshToken(value: string, options = {}): void {
  Cookies.set(REFRESH_TOKEN_KEY, value, { ...DEFAULT_OPTIONS, ...options })
}

/**
 * Get refresh token from cookies
 * @returns The refresh token value or undefined if not found
 */
export function getRefreshToken(): string | undefined {
  return Cookies.get(REFRESH_TOKEN_KEY)
}

/**
 * Remove refresh token from cookies
 */
export function removeRefreshToken(): void {
  Cookies.remove(REFRESH_TOKEN_KEY, { path: '/' })
}

/**
 * Check if user is authenticated based on cookie presence
 * @returns True if authenticated, false otherwise
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken()
}

/**
 * Set both authentication and refresh tokens in cookies
 * @param authToken - The access token value
 * @param refreshToken - The refresh token value
 * @param options - Cookie options (optional)
 */
export function setAuthTokens(
  authToken: string,
  refreshToken: string,
  options = {}
): void {
  setAuthToken(authToken, options)
  setRefreshToken(refreshToken, options)
}

/**
 * Remove both authentication and refresh tokens from cookies
 */
export function removeAuthTokens(): void {
  removeAuthToken()
  removeRefreshToken()
}

/**
 * Set any cookie with options
 * @param key - Cookie name
 * @param value - Cookie value
 * @param options - Cookie options
 */
export function setCookie(key: string, value: string, options = {}): void {
  Cookies.set(key, value, { ...DEFAULT_OPTIONS, ...options })
}

/**
 * Get any cookie by key
 * @param key - Cookie name
 * @returns Cookie value or undefined
 */
export function getCookie(key: string): string | undefined {
  return Cookies.get(key)
}

/**
 * Remove any cookie by key
 * @param key - Cookie name
 * @param options - Cookie options
 */
export function removeCookie(key: string, options = {}): void {
  Cookies.remove(key, { path: '/', ...options })
}

/**
 * Clear all cookies (useful for logout)
 */
export function clearAllCookies(): void {
  // Get all cookies
  const cookies = document.cookie.split(';')

  // Remove each cookie
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.slice(0, eqPos).trim() : cookie.trim()
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`
  }
}
