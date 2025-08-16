import { axiosInstance } from "@/api/axiosInstance"
import { useMutation } from "@tanstack/react-query"

export const useDelete = (endpoint, options = {}) => {
    return useMutation({
        mutationFn: async () => {
            await axiosInstance.delete(endpoint)
        },
        ...options
    })
}