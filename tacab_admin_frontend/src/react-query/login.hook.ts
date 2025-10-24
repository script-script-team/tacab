import { useMutation, useQuery } from '@tanstack/react-query'
import api from './axios'
import axios from 'axios'
import type { ILoginResponse, IWhoAmIRes } from '@/pages/types/login.type'

// ✅ Login hook
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

// ✅ Logout hook
export const useLogout = () => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      try {
        // Clear tokens from localStorage
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        // Optional: call logout endpoint if needed
        const res = await api.get('/api/auth/logout')

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Logout failed')
        }

        return res.data
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
