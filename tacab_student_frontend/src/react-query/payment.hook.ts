import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { api } from "./axios.hoooks"
import type { PaymentsResponse } from "@/types/payment.type"

export const usePayment = (id: number) => {
    return useQuery({
        queryKey: ['payment'],
        queryFn: async() => {
            try {
                const res = await api.get(`/api/payment/student/` + id)
        
                if (!res.data.ok) {
                  throw new Error(res.data.message || 'Fieled to get payment')
                }

                return res.data as PaymentsResponse

            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                  throw new Error(error.response.data?.message || 'Unknown Error')
                }
                throw error
            }
        }
    })
}