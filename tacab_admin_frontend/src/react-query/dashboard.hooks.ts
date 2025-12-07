import { useQuery } from '@tanstack/react-query'
import api from './axios'
import type { IGetDashboardSummaryRes, income } from '@/pages/types/dashboard.types'
import axios from 'axios'
import type { statistics } from '@/pages/types/statistics.type'

export const useGetDashboardSummary = () => {
  return useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: async () => {
      try {
        const res = await api.get(`/api/dashboard/summary/system`)

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

export const GetStatistics = () => {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      try {
        const res = await api.get(`/api/dashboard/statistics`)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to get the statistics')
        }

        return res.data as statistics
      } catch (error) {
        if (axios.isAxiosError(error) && error.message) {
          throw new Error(error.response?.data.message || 'Unkown Error')
        }
        throw error
      }
    },
  })
}

export const useItIncome = () => {
  return useQuery({
    queryKey: ["it-income"],
    queryFn: async() => {
      try {

        const res = await api.get(`/api/dashboard/itIncome`)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to get the statistics')
        }

        return res.data as income
        
      } catch (error) {
        if (axios.isAxiosError(error) && error.message) {
          throw new Error(error.response?.data.message || 'Unkown Error')
        }
        throw error
      }
    }
  });
}

export const useComIncome = () => {
  return useQuery({
    queryKey: ["com-Income"],
    queryFn: async() => {
      try {

        const res = await api.get(`/api/dashboard/comIncome`)

        if (!res.data.ok) {
          throw new Error(res.data.message || 'Fieled to get the statistics')
        }

        return res.data as income
        
      } catch (error) {
        if (axios.isAxiosError(error) && error.message) {
          throw new Error(error.response?.data.message || 'Unkown Error')
        }
        throw error
      }
    }
  });
}