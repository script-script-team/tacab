import { useQuery } from '@tanstack/react-query'
import api from './axios'
import { BASE_API_URL } from '@/pages/constant'
import type { IGetDashboardSummaryRes } from '@/pages/types/dashboard.types'
import axios from 'axios'

export const useGetDashboardSummary = () => {
  return useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: async () => {
      try {
        const res = await api.get(
          `${BASE_API_URL}/api/dashboard/summary/system`
        )

        if (!res.data.ok) {
          throw new Error(
            res.data.message || 'Fieled to get the dashboard summary'
          )
        }

        return res.data as IGetDashboardSummaryRes
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data?.message || 'Unknown Error')
        }
        throw error
      }
    },
  })
}
