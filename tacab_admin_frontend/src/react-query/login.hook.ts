import { useMutation, useQuery } from '@tanstack/react-query'
import api from './axios'
import axios from 'axios'
import { clearRefreshToken } from '@/lib/tokenStore'
import type { ILoginResponse, IWhoAmIRes } from '@/pages/types/login.type'

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      try {
        const res = await api.post('/api/auth/login', data)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Login failed')
        }

        return res.data as ILoginResponse
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data?.message || 'Unknown Error')
        }
        throw error
      }
    },
  })
}

export const useLogout = () => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      try {
        // Clear tokens from storage
        localStorage.removeItem('access_token')
        clearRefreshToken()

        return
      } catch (error) {
        console.error(error)
        if (axios.isAxiosError(error)) {
          const message =
            (error.response?.data as { message?: string })?.message ||
            'Unknown Error'
          throw new Error(message)
        }
        throw new Error('Unknown Error')
      }
    },
  })
}

// ✅ WhoAmI hook
export const useWhoAmI = () => {
  return useQuery({
    queryKey: ['whoami'],
    queryFn: async () => {
      try {
        const res = await api.get('/api/auth/whoami')

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Failed to get the user')
        }

        return res.data as IWhoAmIRes
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data?.message || 'Unknown Error')
        }
        throw error
      }
    },
    retry: false,
    staleTime: Infinity,
  })
}
