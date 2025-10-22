import { BASE_API_URL } from '@/pages/constant'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from './axios'
import axios from 'axios'
import type { ILoginResponse, IWhoAmIRes } from '@/pages/types/login.type'

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      try {
        const res = await api.post(`${BASE_API_URL}/api/auth/login`, data)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Login fieled')
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
  return useQuery({
    queryKey: ['logout'],
    queryFn: async () => {
      try {
        const res = await api.get(`${BASE_API_URL}/api/auth/logout`)

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

        // Non-Axios error
        throw new Error('Unknown Error')
      }
    },
  })
}

export const useWhoAmI = () => {
  return useQuery({
    queryKey: ['whoami'],
    queryFn: async () => {
      try {
        const res = await api.get(`${BASE_API_URL}/api/auth/whoami`)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to get the user')
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
