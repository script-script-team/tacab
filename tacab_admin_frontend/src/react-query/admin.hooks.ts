import { BASE_API_URL } from '@/pages/constant'
import { useQuery } from '@tanstack/react-query'
import api from './axios'

export const useGetAllAdmins = () => {
  return useQuery({
    queryKey: ['all-admins'],
    queryFn: async () => {
      const res = await api.get(`${BASE_API_URL}/api/auth/`)
      const data = await res.data

      console.log(data)

      return data
    },
  })
}
