'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import api from '@/services/Api'
import {
  GET_ALL_USERS,
  GET_SINGLE_USER,
  CREATE_OFFER,
  MY_OFFER,
  GET_INVESTMENTS,
} from '@/lib/Constants'

// Types
export interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  avatar?: string
  joinedAt: string
  lastActive: string
  phoneNumber?: string
  address?: string
  company?: string
}

export interface Product {
  id: string
  name: string
  price: number
  category: string
  stock: number
  rating: number
  description: string
  imageUrl?: string
  createdAt: string
}

export interface Investment {
  id: string
  userId: string
  amount: number
  currency: string
  type: string
  status: 'pending' | 'active' | 'completed' | 'cancelled'
  startDate: string
  endDate: string
  expectedReturn: number
  actualReturn?: number
}

export interface Offer {
  id: string
  title: string
  description: string
  price: number
  category: string
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  updatedAt: string
}

// Query Keys
export const queryKeys = {
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,
  products: ['products'] as const,
  product: (id: string) => ['products', id] as const,
  investments: ['investments'] as const,
  investment: (id: string) => ['investments', id] as const,
  offers: ['offers'] as const,
  offer: (id: string) => ['offers', id] as const,
  myOffers: ['offers', 'my'] as const,
}

// Users Queries
export const useUsers = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: [...queryKeys.users, params],
    queryFn: async () => {
      return new Promise<User[]>((resolve) => {
        api.getAllData(
          {
            url: GET_ALL_USERS,
            params,
          },
          (response: any) => {
            resolve(response.data)
          }
        )
      })
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  })
}

export const useUser = (id: string) => {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: async () => {
      return new Promise<User>((resolve) => {
        api.getSingleData(
          {
            url: `${GET_SINGLE_USER}/${id}`,
          },
          (response: any) => {
            resolve(response.data as any)
          }
        )
      })
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

// Products Queries (using mock data for demo)
export const useProducts = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: [...queryKeys.products, params],
    queryFn: async (): Promise<Product[]> => {
      // Simulate API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 800))
      return [
        {
          id: '1',
          name: 'Wireless Headphones Pro',
          price: 299.99,
          category: 'Electronics',
          stock: 45,
          rating: 4.8,
          description:
            'Premium wireless headphones with active noise cancellation and 30-hour battery life',
          imageUrl:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
          createdAt: '2024-01-15T10:00:00Z',
        },
        {
          id: '2',
          name: 'Smart Fitness Watch',
          price: 399.99,
          category: 'Wearables',
          stock: 22,
          rating: 4.6,
          description:
            'Advanced fitness tracking with GPS, heart rate monitoring, and 7-day battery',
          imageUrl:
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
          createdAt: '2024-01-12T14:30:00Z',
        },
        {
          id: '3',
          name: 'Professional Coffee Machine',
          price: 899.99,
          category: 'Appliances',
          stock: 8,
          rating: 4.9,
          description:
            'Barista-quality espresso machine with built-in grinder and milk frother',
          imageUrl:
            'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300',
          createdAt: '2024-01-10T09:15:00Z',
        },
        {
          id: '4',
          name: 'Wireless Charging Station',
          price: 79.99,
          category: 'Electronics',
          stock: 67,
          rating: 4.4,
          description:
            '3-in-1 wireless charging station for phone, watch, and earbuds',
          imageUrl:
            'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300',
          createdAt: '2024-01-08T16:45:00Z',
        },
        {
          id: '5',
          name: 'Ultra HD Webcam',
          price: 199.99,
          category: 'Electronics',
          stock: 34,
          rating: 4.7,
          description:
            '4K webcam with auto-focus and noise-cancelling microphone for professional streaming',
          imageUrl:
            'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=300',
          createdAt: '2024-01-05T11:20:00Z',
        },
      ]
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Investments Queries
export const useInvestments = (userId?: string) => {
  return useQuery({
    queryKey: [...queryKeys.investments, userId],
    queryFn: async () => {
      return new Promise<Investment[]>((resolve) => {
        api.getAllData(
          {
            url: GET_INVESTMENTS,
            params: userId ? { userId } : undefined,
          },
          (response: any) => {
            resolve(response.data as any)
          }
        )
      })
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// Offers Queries
export const useOffers = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: [...queryKeys.offers, params],
    queryFn: async () => {
      return new Promise<Offer[]>((resolve) => {
        api.getAllData(
          {
            url: CREATE_OFFER,
            params,
          },
          (response: any) => {
            resolve(response.data)
          }
        )
      })
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useMyOffers = () => {
  return useQuery({
    queryKey: queryKeys.myOffers,
    queryFn: async () => {
      return new Promise<Offer[]>((resolve) => {
        api.getAllData(
          {
            url: MY_OFFER,
          },
          (response: any) => {
            resolve(response.data)
          }
        )
      })
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Mutations
export const useCreateUser = () => {
  const queryClient = useQueryClient()
  const t = useTranslations()

  return useMutation({
    mutationFn: async (userData: Partial<User>) => {
      return new Promise<User>((resolve, reject) => {
        api.post(
          {
            url: GET_ALL_USERS,
            body: userData,
            errorHandle: (err) => {
              reject(
                new Error(
                  err.error instanceof Error
                    ? err.error.message
                    : 'Failed to create user'
                )
              )
            },
          },
          (response: any) => {
            resolve(response.data)
          }
        )
      })
    },
    onSuccess: (data) => {
      // Invalidate and refetch users query
      queryClient.invalidateQueries({ queryKey: queryKeys.users })
      toast.success(t('common.success'), {
        description: `User ${data.name} created successfully`,
      })
    },
    onError: (error: Error) => {
      toast.error(t('common.error'), {
        description: error.message,
      })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  const t = useTranslations()

  return useMutation({
    mutationFn: async ({
      id,
      userData,
    }: {
      id: string
      userData: Partial<User>
    }) => {
      return new Promise<User>((resolve, reject) => {
        api.updateData(
          {
            url: `${GET_SINGLE_USER}/${id}`,
            body: userData,
            errorHandle: (err) => {
              reject(
                new Error(
                  err.error instanceof Error
                    ? err.error.message
                    : 'Failed to update user'
                )
              )
            },
          },
          (response: any) => {
            resolve(response.data as any)
          }
        )
      })
    },
    onSuccess: (data, variables) => {
      // Update the specific user in cache
      queryClient.setQueryData(queryKeys.user(variables.id), data)
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: queryKeys.users })
      toast.success(t('common.success'), {
        description: `User ${data.name} updated successfully`,
      })
    },
    onError: (error: Error) => {
      toast.error(t('common.error'), {
        description: error.message,
      })
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  const t = useTranslations()

  return useMutation({
    mutationFn: async (id: string) => {
      return new Promise<void>((resolve, reject) => {
        api.deleteData(
          {
            url: `${GET_SINGLE_USER}/${id}`,
            errorHandle: (err) => {
              reject(
                new Error(
                  err.error instanceof Error
                    ? err.error.message
                    : 'Failed to delete user'
                )
              )
            },
          },
          () => {
            resolve()
          }
        )
      })
    },
    onSuccess: (_, id) => {
      // Remove user from cache
      queryClient.removeQueries({ queryKey: queryKeys.user(id) })
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: queryKeys.users })
      toast.success(t('common.success'), {
        description: 'User deleted successfully',
      })
    },
    onError: (error: Error) => {
      toast.error(t('common.error'), {
        description: error.message,
      })
    },
  })
}

export const useCreateOffer = () => {
  const queryClient = useQueryClient()
  const t = useTranslations()

  return useMutation({
    mutationFn: async (offerData: Partial<Offer>) => {
      return new Promise<Offer>((resolve, reject) => {
        api.post(
          {
            url: CREATE_OFFER,
            body: offerData,
            errorHandle: (err) => {
              reject(
                new Error(
                  err.error instanceof Error
                    ? err.error.message
                    : 'Failed to create offer'
                )
              )
            },
          },
          (response: any) => {
            resolve(response.data)
          }
        )
      })
    },
    onSuccess: (data) => {
      // Invalidate offers queries
      queryClient.invalidateQueries({ queryKey: queryKeys.offers })
      queryClient.invalidateQueries({ queryKey: queryKeys.myOffers })
      toast.success(t('common.success'), {
        description: `Offer "${data.title}" created successfully`,
      })
    },
    onError: (error: Error) => {
      toast.error(t('common.error'), {
        description: error.message,
      })
    },
  })
}

// Custom hook to prefetch data
export const usePrefetchUser = () => {
  const queryClient = useQueryClient()

  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.user(id),
      queryFn: async () => {
        return new Promise<User>((resolve) => {
          api.getSingleData(
            {
              url: `${GET_SINGLE_USER}/${id}`,
            },
            (response: any) => {
              resolve(response.data)
            }
          )
        })
      },
      staleTime: 5 * 60 * 1000,
    })
  }
}

// Optimistic update example
export const useOptimisticToggleUserStatus = () => {
  const queryClient = useQueryClient()
  const t = useTranslations()

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string
      status: User['status']
    }) => {
      return new Promise<User>((resolve, reject) => {
        api.patchUpdateData(
          {
            url: `${GET_SINGLE_USER}/${id}`,
            body: { status },
            errorHandle: (err) => {
              reject(
                new Error(
                  err.error instanceof Error
                    ? err.error.message
                    : 'Failed to update status'
                )
              )
            },
          },
          (response: any) => {
            resolve(response.data)
          }
        )
      })
    },
    onMutate: async ({ id, status }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.user(id) })

      // Snapshot the previous value
      const previousUser = queryClient.getQueryData<User>(queryKeys.user(id))

      // Optimistically update to the new value
      if (previousUser) {
        queryClient.setQueryData<User>(queryKeys.user(id), {
          ...previousUser,
          status,
        })
      }

      // Return a context object with the snapshotted value
      return { previousUser }
    },
    onError: (error, { id }, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousUser) {
        queryClient.setQueryData(queryKeys.user(id), context.previousUser)
      }
      toast.error(t('common.error'), {
        description: error.message,
      })
    },
    onSuccess: (data) => {
      toast.success(t('common.success'), {
        description: `User status updated to ${data.status}`,
      })
    },
    onSettled: (_, __, { id }) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: queryKeys.user(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.users })
    },
  })
}
