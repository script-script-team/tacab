import { useMutation } from '@tanstack/react-query'
import api from './axios'

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: async (email: string) => {
      const res = await api.post('api/auth/forgot-password', { email })

      if (!res.data.ok) {
        throw new Error(res.data.message || 'Failed to send the reset code')
      }

      return res.data
    },
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ['reset-password'],
    mutationFn: async (payload: { token: string; password: string }) => {
      const res = await api.post(`api/auth/reset-password/${payload.token}`, {
        password: payload.password,
      })
      if (!res.data.ok) {
        throw new Error(res.data.message || 'Failed to reset password')
      }
      return res.data
    },
  })
}
