import axios, { AxiosRequestConfig } from 'axios'
import { toast } from 'sonner'

import { API_BASE_URL } from '@/lib/Constants'
import { getAuthToken } from '@/lib/cookies'

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

type ApiCallOptions = {
  url: string
  method: Method
  setLoading?: (loading: boolean) => void
  body?: unknown
  params?: Record<string, unknown>
  errorHandle?: (err: { type: 'auth' | 'general'; error: unknown }) => void
}

type ApiFunctionProps = {
  url: string
  setLoading?: (loading: boolean) => void
  body?: unknown
  params?: Record<string, unknown>
  errorHandle?: (err: { type: 'auth' | 'general'; error: unknown }) => void
}

type Callback = (response: unknown) => void

const getAuthHeader = (isFormData = false) => {
  const accessToken = getAuthToken()
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
    },
  }
}

const apiCall = async (
  { setLoading, url, body, params, method, errorHandle }: ApiCallOptions,
  next?: Callback
): Promise<unknown | void> => {
  const axiosCall = async () => {
    const isFormData = body instanceof FormData
    const authHeaders = getAuthHeader(isFormData)

    if (['post', 'put', 'patch'].includes(method)) {
      return axios[method](
        `${API_BASE_URL}${url}`,
        body as unknown as AxiosRequestConfig,
        {
          ...authHeaders,
          params,
        }
      )
    }

    return axios[method](`${API_BASE_URL}${url}`, {
      ...authHeaders,
      params,
    })
  }

  try {
    setLoading?.(true)
    const response = await axiosCall()
    next?.(response)
    return response
  } catch (error: unknown) {
    const axiosError = error as {
      response?: { status?: number; data?: { message?: string } }
      status?: number
    }
    const status = axiosError?.response?.status ?? axiosError?.status

    if ([401, 403].includes(status ?? -1)) {
      errorHandle?.({ type: 'auth', error })
      toast.error(
        axiosError?.response?.data?.message || 'Authentication failed'
      )
    } else {
      errorHandle?.({ type: 'general', error })
      toast.error(axiosError?.response?.data?.message || 'Something went wrong')
    }
  } finally {
    setLoading?.(false)
  }
}

const api = {
  getAllData: (props: ApiFunctionProps, next?: Callback) =>
    apiCall({ ...props, method: 'get' }, next),

  getSingleData: (props: ApiFunctionProps, next?: Callback) =>
    apiCall({ ...props, method: 'get' }, next),

  post: (props: ApiFunctionProps, next?: Callback) =>
    apiCall({ ...props, method: 'post' }, next),

  updateData: (props: ApiFunctionProps, next?: Callback) =>
    apiCall({ ...props, method: 'put' }, next),

  patchUpdateData: (props: ApiFunctionProps, next?: Callback) =>
    apiCall({ ...props, method: 'patch' }, next),

  deleteData: (props: ApiFunctionProps, next?: Callback) =>
    apiCall({ ...props, method: 'delete' }, next),

  nextAction: (response: unknown | void, callback: () => void) => {
    if (response) callback()
  },
}

export default api
