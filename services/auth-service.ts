import api from './Api'

import { GET_USER_PROFILE, LOGOUT, SIGN_IN_OTP } from '@/lib/Constants'

export interface LoginRequest {
  email: string
  password?: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    tokens: {
      accessToken: string
      refreshToken: string
    }
    user: {
      id: string
      name: string
      email: string
      role: string
    }
  }
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<any> => {
    await api.post({ url: SIGN_IN_OTP, body: credentials }, (response: any) => {
      return response.data
    })
  },

  register: async (userData: RegisterRequest): Promise<any> => {
    await api.post({ url: SIGN_IN_OTP, body: userData }, (response: any) => {
      return response.data
    })
  },

  logout: async (): Promise<void> => {
    try {
      // Call backend logout API to invalidate tokens
      await api.post({ url: LOGOUT })
    } catch (error) {
      console.error('Logout API error:', error)
      // Even if API fails, we should still clear local tokens
      // This ensures user is logged out locally even if backend is down
    }
  },

  getCurrentUser: async (): Promise<any> => {
    api.getSingleData({ url: GET_USER_PROFILE }, (response: any) => {
      return response.data
    })
  },

  getUserProfile: async (): Promise<any> => {
    api.getSingleData(
      {
        url: GET_USER_PROFILE,
        errorHandle: (err) => {
          console.error('Profile fetch error:', err)
          throw err
        },
      },
      (response: any) => {
        return response.data
      }
    )
  },
}
