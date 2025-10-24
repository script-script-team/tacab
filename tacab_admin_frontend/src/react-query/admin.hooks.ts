import { BASE_API_URL } from '@/pages/constant'
import {
  useMutation,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query'
import api from './axios'
import axios from 'axios'
import type { IAdminSummary, IGetALlAdminsRes } from '@/pages/types/admin.types'
import type { IUpdateUploadRes } from '@/pages/types/upload.types'

export const useGetAllAdmins = () => {
  return useQuery({
    queryKey: ['all-admins'],
    queryFn: async () => {
      try {
        const res = await api.get(`${BASE_API_URL}/api/auth/`)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to get the admins')
        }

        return res.data as IGetALlAdminsRes
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data?.message || 'Unknown Error')
        }
        throw error
      }
    },
  })
}

export const useCreateAdmin = () => {
  return useMutation({
    mutationKey: ['new-admin'],
    mutationFn: async (data: {
      name: string
      email: string
      phone_number: string
      password: string
      confirm_password: string
    }) => {
      try {
        const res = await api.post(`${BASE_API_URL}/api/auth/register`, data)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to create new admin')
        }

        return res.data as IUpdateUploadRes
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data?.message || 'Unknown Error')
        }
        throw error
      }
    },
  })
}

export const useGetAdminSummary = (
  id: number,
  options?: UseQueryOptions<
    IAdminSummary,
    Error,
    IAdminSummary,
    [string, number]
  >
) => {
  return useQuery({
    queryKey: ['admin-summary', id],
    queryFn: async () => {
      try {
        const res = await api.get(
          `${BASE_API_URL}/api/dashboard/summary/admin/${id}`
        )

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to get admin summary')
        }

        return res.data as IAdminSummary
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data?.message || 'Unknown Error')
        }
        throw error
      }
    },
    enabled: options?.enabled ?? true,
    ...options,
  })
}

export const useUpdateAdmin = () => {
  return useMutation({
    mutationKey: ['update-admin'],
    mutationFn: async (data: {
      id: number
      name: string
      email: string
      phone_number: string
    }) => {
      try {
        const res = await api.put(
          `${BASE_API_URL}/api/auth/update/${data.id}`,
          {
            name: data.name,
            email: data.email,
            phone_number: data.phone_number,
          }
        )

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to update admin')
        }

        return res.data as IUpdateUploadRes
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data?.message || 'Unknown Error')
        }
        throw error
      }
    },
  })
}

export const useDeleteAdmin = () => {
  return useMutation({
    mutationKey: ['delete-admin'],
    mutationFn: async (id: number) => {
      try {
        const res = await api.delete(`${BASE_API_URL}/api/auth/delete/${id}`)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to delete admin')
        }

        return res.data as IUpdateUploadRes
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data?.message || 'Unknown Error')
        }
        throw error
      }
    },
  })
}
