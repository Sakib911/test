/**
 * User Storage Utility
 * Manages localStorage for user visit tracking and registration status
 */

export interface UserVisitData {
  isFirstVisit: boolean
  hasRegistered: boolean
  isVerified: boolean
  lastVisit: string
  registrationStep?: number
  email?: string
}

const USER_STORAGE_KEY = 'depot_user_data'

/**
 * Get user visit data from localStorage
 */
export const getUserVisitData = (): UserVisitData => {
  try {
    const stored = localStorage.getItem(USER_STORAGE_KEY)
    if (!stored) {
      // First time visitor
      const defaultData: UserVisitData = {
        isFirstVisit: true,
        hasRegistered: false,
        isVerified: false,
        lastVisit: new Date().toISOString(),
      }
      setUserVisitData(defaultData)
      return defaultData
    }

    const data: UserVisitData = JSON.parse(stored)

    // Update last visit
    data.lastVisit = new Date().toISOString()
    if (data.isFirstVisit) {
      data.isFirstVisit = false
    }

    setUserVisitData(data)
    return data
  } catch (error) {
    console.error('Error reading user visit data:', error)
    // Return safe default
    return {
      isFirstVisit: true,
      hasRegistered: false,
      isVerified: false,
      lastVisit: new Date().toISOString(),
    }
  }
}

/**
 * Set user visit data to localStorage
 */
export const setUserVisitData = (data: Partial<UserVisitData>): void => {
  try {
    const currentData = getCurrentUserData()
    const updatedData = { ...currentData, ...data }
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedData))
  } catch (error) {
    console.error('Error saving user visit data:', error)
  }
}

/**
 * Get current user data without updating visit time
 */
const getCurrentUserData = (): UserVisitData => {
  try {
    const stored = localStorage.getItem(USER_STORAGE_KEY)
    if (!stored) {
      return {
        isFirstVisit: true,
        hasRegistered: false,
        isVerified: false,
        lastVisit: new Date().toISOString(),
      }
    }
    return JSON.parse(stored)
  } catch (error) {
    return {
      isFirstVisit: true,
      hasRegistered: false,
      isVerified: false,
      lastVisit: new Date().toISOString(),
    }
  }
}

/**
 * Mark user as registered
 */
export const markUserRegistered = (email: string, step: number = 1): void => {
  setUserVisitData({
    hasRegistered: true,
    isFirstVisit: false,
    registrationStep: step,
    email,
  })
}

/**
 * Mark user as verified
 */
export const markUserVerified = (): void => {
  setUserVisitData({
    isVerified: true,
    registrationStep: undefined,
  })
}

/**
 * Clear user data (for logout or reset)
 */
export const clearUserData = (): void => {
  try {
    localStorage.removeItem(USER_STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing user data:', error)
  }
}

/**
 * Get recommended auth route based on user status
 */
export const getRecommendedAuthRoute = (): string => {
  const userData = getCurrentUserData()

  // If user is verified, they should use login
  if (userData.isVerified) {
    return '/auth/login'
  }

  // If user has registered but not verified, continue registration
  if (userData.hasRegistered && userData.registrationStep) {
    return '/auth/register'
  }

  // If user has registered but verification unknown, try login first
  if (userData.hasRegistered) {
    return '/auth/login'
  }

  // First time visitors or unregistered users go to registration
  return '/auth/register'
}

/**
 * Update registration step progress
 */
export const updateRegistrationStep = (step: number): void => {
  setUserVisitData({
    registrationStep: step,
  })
}

/**
 * Check if user should see onboarding
 */
export const shouldShowOnboarding = (): boolean => {
  const userData = getCurrentUserData()
  return userData.isFirstVisit && !userData.hasRegistered
}
