import { useMutation } from '@tanstack/react-query';
import api from './axios';
import { BASE_API_URL } from '@/pages/constant';

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: async (email: string) => {
      const res = await api.post(`${BASE_API_URL}/api/auth/forgot-password`, { email });

      if (!res.data.ok) {
          throw new Error(
            res.data.message || 'Failed to send the reset code'
          )
        }

      return res.data;
    }
  });
};

export const useVerifyResetCode = () => {
  return useMutation({
    mutationKey: ['verify-reset-code'],
    mutationFn: async (payload: { email: string; code: string }) => {

      const res = await api.post(`${BASE_API_URL}/api/auth/verify-reset-code`, payload);
      if (!res.data.ok) {
          throw new Error(
            res.data.message || 'Failed to verify code'
          )
        }

      return res.data;
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ['reset-password'],
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await api.post(`${BASE_API_URL}/api/auth/reset-password`, payload);
      if (!res.data.ok) {
          throw new Error(
            res.data.message || 'Failed to reset password'
          )
        }
      return res.data;
    },
  });
};

