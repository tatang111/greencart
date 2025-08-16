import { axiosInstance } from "@/api/axiosInstance"
import { useMutation } from "@tanstack/react-query"

export const usePut = (endpoint, options = {}) => {
    return useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.put(endpoint, data)
            return res.data
        },
        ...options
    })
}