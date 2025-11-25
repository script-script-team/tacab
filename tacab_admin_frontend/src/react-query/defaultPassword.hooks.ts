import { useQuery } from '@tanstack/react-query'
import api from './axios'
import { BASE_API_URL } from '@/pages/constant'
import axios from 'axios'
import type { IDefaultPasswordRes } from '@/pages/types/defaultPassword.types'

export const useGetDefaultPassword = () => {
  return useQuery({
    queryKey: ['default-password'],
    queryFn: async () => {
      try {
        const res = await api.get(`${BASE_API_URL}/api/default-password/`)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to get default password')
        }

        return res.data as IDefaultPasswordRes
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data?.message || 'Unknown Error')
        }
        throw error
      }
    },
  })
}
