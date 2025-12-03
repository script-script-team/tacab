import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios";
import api from "./axios";
import type { allPayment, addPaymentBody, updatePaymentBody } from "@/pages/types/payment.type";


export const useGetAllItPayments = (page: number) => {
    return useQuery({
        queryKey: ["all-it-payments", page],
        queryFn: async() => {
            try {

                const res = await api.get("/api/payment/it?page="+page);

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

export const useGetAllComputerPayments = (page: number) => {
    return useQuery({
        queryKey: ["all-computer-payments", page],
        queryFn: async() => {
            try {

                const res = await api.get("/api/payment/computer?page="+page);

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
        mutationFn: async(data: addPaymentBody) => {
            try {

                const res = await api.post("/api/payment", data);

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
        mutationFn: async(data: updatePaymentBody) => {
            try {

                const res = await api.put("/api/payment/" + data.id, data);

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