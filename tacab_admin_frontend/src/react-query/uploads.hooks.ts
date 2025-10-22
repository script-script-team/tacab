import { BASE_API_URL } from '@/pages/constant'
import { useQuery } from '@tanstack/react-query'
import api from './axios'
import axios from 'axios'
import type { IGetAllUploadRes } from '@/pages/types/upload.types'

export const useGetAllUploads = () => {
  return useQuery({
    queryKey: ['all-uploads'],
    queryFn: async () => {
      try {
        const res = await api.get(`${BASE_API_URL}/api/upload/`)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to get the uploads')
        }

        return res.data as IGetAllUploadRes
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data?.message || 'Unknown Error')
        }
        throw error
      }
    },
  })
}
