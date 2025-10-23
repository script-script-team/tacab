import { BASE_API_URL } from '@/pages/constant'
import {
  useMutation,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query'
import api from './axios'
import axios from 'axios'
import type { IUpdateUploadRes } from '@/pages/types/upload.types'
import type {
  IGetAllStudentsRes,
  IGetSingleStudentRes,
} from '@/pages/types/student.types'

export const useGetAllStudents = () => {
  return useQuery({
    queryKey: ['all-students'],
    queryFn: async () => {
      try {
        const res = await api.get(`${BASE_API_URL}/api/student/`)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to get all student')
        }

        return res.data as IGetAllStudentsRes
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data?.message || 'Unknown Error')
        }
        throw error
      }
    },
  })
}

export const useDeleteStudent = () => {
  return useMutation({
    mutationKey: ['delete-student'],
    mutationFn: async (id: number) => {
      try {
        const res = await api.delete(`${BASE_API_URL}/api/student/${id}`)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to delete student')
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

export const useGetSingleStudent = (
  id: number,
  options?: UseQueryOptions<
    IGetSingleStudentRes,
    Error,
    IGetSingleStudentRes,
    [string, number]
  >
) => {
  return useQuery({
    queryKey: ['single-student', id],
    queryFn: async () => {
      try {
        const res = await api.get(`${BASE_API_URL}/api/student/${id}`)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to student')
        }

        return res.data as IGetSingleStudentRes
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

export const useUpdateStudent = () => {
  return useMutation({
    mutationKey: ['update-student'],
    mutationFn: async (data: {
      id: number
      name: string
      phone_number: string
    }) => {
      try {
        const res = await api.put(`${BASE_API_URL}/api/student/${data.id}`, {
          name: data.name,
          phone_number: data.phone_number,
        })

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to update student')
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
