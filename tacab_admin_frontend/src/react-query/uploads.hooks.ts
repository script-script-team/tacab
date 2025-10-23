import { BASE_API_URL } from '@/pages/constant'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from './axios'
import axios from 'axios'
import type {
  IExtractFile,
  IGetAllUploadRes,
  ISaveUpload,
} from '@/pages/types/upload.types'
import type { IStudentProp } from '@/pages/types/student.types'

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
