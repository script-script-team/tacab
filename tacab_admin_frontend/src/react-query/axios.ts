import { BASE_API_URL } from '@/pages/constant'
import axios, { AxiosError } from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface FailedQueueItem {
  resolve: (value?: unknown) => void
  reject: (error?: Error) => void
}

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean
}

const api = axios.create({
  baseURL: BASE_API_URL,
})

// Separate instance to avoid recursive interceptor calls
const refreshApi = axios.create({
  baseURL: BASE_API_URL,
})

// Add Authorization header for all normal requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

let isRefreshing = false
let failedQueue: FailedQueueItem[] = []

const processQueue = (error: Error | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve()
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry

    // only trigger once for each request
    if (error.response?.status === 401 && !originalRequest._retry) {
      // if it's the refresh endpoint itself → logout or reject
      if (originalRequest.url?.includes('/auth/refresh-token')) {
        console.warn('Refresh token expired or invalid')
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        return Promise.reject(error)
      }

      // If refresh is in progress, queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(() => api(originalRequest))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (!refreshToken) throw new Error('No refresh token found')

        // 🔥 This will always send even if access token is expired
        const { data } = await refreshApi.get('/api/auth/refresh-token', {
          headers: { 'X-Refresh-Token': refreshToken },
        })

        // store new access token
        localStorage.setItem('access_token', data.accessToken)

        processQueue()
        return api(originalRequest) // retry the failed request
      } catch (err) {
        processQueue(err as Error)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
