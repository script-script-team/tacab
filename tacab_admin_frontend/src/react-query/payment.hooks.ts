import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios";
import api from "./axios";
import type { allPayment } from "@/pages/types/payment.type";


export const useGetAllPayments = (page: number) => {
    return useQuery({
        queryKey: ["all-payments", page],
        queryFn: async() => {
            try {

                const res = await api.get("/api/payment?page="+page);

                if(!res.data.ok) {
                    throw new Error(res.data.message || "Failed to get data");
                }

                return res.data as allPayment
                
            } catch (error) {
                if(axios.isAxiosError(error) && error.response) {
                    throw new Error(error.response.data.message || "Unkown Error!");
                }
                throw error
            }
        },
        enabled: !!page
    });
}

export const useAddPayment = () => {
    return useMutation({
        mutationKey: ["add-payment"],
        mutationFn: async(id: string) => {
            try {

                const res = await api.post("/api/payment/" + id);

                if(!res.data.ok) {
                    throw new Error(res.data.message || "Failed to get the data");
                }

                return res.data
                
            } catch (error) {
                if(axios.isAxiosError(error) && error.response) {
                    throw new Error(error.response.data.message || "Unkown Error");
                }
                throw error;
            }
        }
    });
}
export const useUpdatePayment = () => {
    return useMutation({
        mutationKey: ["update-payment"],
        mutationFn: async(id: string) => {
            try {

                const res = await api.put("/api/payment/" + id);

                if(!res.data.ok) {
                    throw new Error(res.data.message || "Failed to get the data");
                }

                return res.data
                
            } catch (error) {
                if(axios.isAxiosError(error) && error.response) {
                    throw new Error(error.response.data.message || "Unkown Error");
                }
                throw error;
            }
        }
    });
}

export const useDeletePayment = () => {
    return useMutation({
        mutationKey: ["delete-payment"],
        mutationFn: async(id: string) => {
            try {

                const res = await api.delete("/api/payment/" + id);

                if(!res.data.ok) {
                    throw new Error(res.data.message || "Failed to get the data");
                }

                return res.data
                
            } catch (error) {
                if(axios.isAxiosError(error) && error.response) {
                    throw new Error(error.response.data.message || "Unkown Error");
                }
                throw error;
            }
        }
    });
}