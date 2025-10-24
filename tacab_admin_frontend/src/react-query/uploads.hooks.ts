import { BASE_API_URL } from '@/pages/constant'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from './axios'
import axios from 'axios'
import type {
  IExtractFile,
  IGetAllUploadRes,
  IGetSingleUploadRes,
  ISaveUpload,
  IUpdateUploadRes,
} from '@/pages/types/upload.types'
import type { IStudentProp } from '@/pages/types/student.types'

export const useGetAllUploads = (page: number) => {
  return useQuery({
    queryKey: ['all-uploads', page],
    queryFn: async () => {
      try {
        const res = await api.get(`${BASE_API_URL}/api/upload/?page=${page}`)

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

export const searchUploads = (data: string) => {
  return useQuery({
    queryKey: ['searchUploads', data],
    queryFn: async () => {
      try {
        
        const res = await api.get(`${BASE_API_URL}/api/upload/search/${data}`);

        if(!res.data.ok) {
          throw new Error(res.data.error || "Fieled to search!")
        }

        return res.data as IGetAllUploadRes

      } catch (error) {
        if(axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message || "Unknown Error")
        }
        throw error
      }
    },
    enabled: !!data
  });
}

export const useExtractData = () => {
  return useMutation({
    mutationKey: ['extract-data'],
    mutationFn: async (file: File) => {
      try {
        const res = await api.post(
          `${BASE_API_URL}/api/upload/excel`,
          { 'excel-file': file },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )

        if (!res.data.ok) {
          throw new Error(
            res.data.message || 'Fieled to exctract data from upload'
          )
        }

        return res.data as IExtractFile
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data?.message || 'Unknown Error')
        }
        throw error
      }
    },
  })
}

export const useSaveData = () => {
  return useMutation({
    mutationKey: ['save-data'],
    mutationFn: async (data: { subject: string; data: IStudentProp[] }) => {
      try {
        const res = await api.post(`${BASE_API_URL}/api/upload/save`, data)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to save upload')
        }

        return res.data as ISaveUpload
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data?.message || 'Unknown Error')
        }
        throw error
      }
    },
  })
}

export const useGetSingleUpload = (id: string) => {
  return useQuery({
    queryKey: ['single-upload', id],
    queryFn: async () => {
      try {
        const res = await api.get(`${BASE_API_URL}/api/upload/${id}`)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to get single upload')
        }

        return res.data as IGetSingleUploadRes
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data?.message || 'Unknown Error')
        }
        throw error
      }
    },
  })
}

export const useUpdateUpload = () => {
  return useMutation({
    mutationKey: ['update-upload'],
    mutationFn: async (data: { id: string; term: string; year: number }) => {
      try {
        const res = await api.put(`${BASE_API_URL}/api/upload/${data.id}`, {
          term: data.term,
          year: data.year,
        })

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to update upload')
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

export const useDeleteUpload = () => {
  return useMutation({
    mutationKey: ['delete-upload'],
    mutationFn: async (id: string) => {
      try {
        const res = await api.delete(`${BASE_API_URL}/api/upload/${id}`)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to delete upload')
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
