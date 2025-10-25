import { useMutation } from '@tanstack/react-query'
import { api } from './axios.hoooks'
import axios from 'axios'
import type { IGetResultRes } from '@/types/login.type'

export const useGetResult = () => {
  return useMutation({
    mutationKey: ['get-result'],
    mutationFn: async (data: {
      name: string
      phone_number: string
      subject: string
    }) => {
      try {
        const res = await api.post(`/api/student/`, data)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to delete student')
        }

        return res.data as IGetResultRes
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data?.message || 'Unknown Error')
        }
        throw error
      }
    },
  })
}
