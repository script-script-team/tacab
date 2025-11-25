import { useMutation } from '@tanstack/react-query'
import { api } from './axios.hoooks'
import axios from 'axios'
import type { IGetResultRes } from '@/types/login.type'
import { toast } from 'sonner'

export const useGetResult = () => {
  return useMutation({
    mutationKey: ['get-result'],
    mutationFn: async (data: {
      password: string
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

export const useChangePassword = () => {
  return useMutation({
    mutationKey: ['get-result'],
    mutationFn: async (data: {
      oldPassword: string
      newPassword: string
      confirmPassword: string
      id: number
    }) => {
      try {
        const res = await api.post(`/api/student/change-password`, data)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to delete student')
        }

        toast.success(res.data.message);
         
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
