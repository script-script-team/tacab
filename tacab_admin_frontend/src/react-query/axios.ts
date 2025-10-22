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
  withCredentials: true,
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

    // only trigger on 401 and not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes('/refresh-token')) {
        // refresh token failed → logout user
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(() => api(originalRequest))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // ✅ send GET request to refresh-token route (cookies automatically included)
        await api.get('/api/auth/refresh-token')
        processQueue()
        return api(originalRequest) // retry original request
      } catch (err) {
        processQueue(err as Error)
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
