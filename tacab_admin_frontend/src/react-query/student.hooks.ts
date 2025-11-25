import { BASE_API_URL } from '@/pages/constant'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from './axios'
import axios from 'axios'
import type { IUpdateUploadRes } from '@/pages/types/upload.types'
import type {
  IGetAllStudentsRes,
  IGetSingleStudentRes,
} from '@/pages/types/student.types'

export const useGetAllItStudents = (page: number) => {
  return useQuery({
    queryKey: ['it-students', page],
    queryFn: async () => {
      try {
        const res = await api.get(`${BASE_API_URL}/api/student/it?page=${page}`)

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

export const useGetAllComputerStudents = (page: number) => {
  return useQuery({
    queryKey: ['computer-students', page],
    queryFn: async () => {
      try {
        const res = await api.get(`/api/student/computer?page=${page}`)

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

export const useSearchStudent = (data: string) => {
  return useQuery({
    queryKey: ['Searchstudents', data],
    queryFn: async () => {
      try {
        const res = await api.get(`${BASE_API_URL}/api/student/search/${data}`)

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
    enabled: !!data,
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

export const useGetSingleStudent = (id: number) => {
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
  })
}

export const useUpdateStudent = () => {
  return useMutation({
    mutationKey: ['update-student'],
    mutationFn: async (data: {
      id: number
      name: string
      phone_number: string
      password: string
    }) => {
      try {
        const res = await api.put(`${BASE_API_URL}/api/student/${data.id}`, {
          name: data.name,
          phone_number: data.phone_number,
          password: data.password,
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
