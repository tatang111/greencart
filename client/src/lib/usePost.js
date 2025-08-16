import { axiosInstance } from "@/api/axiosInstance"
import { useMutation } from "@tanstack/react-query"

export const usePost = (endpoint, options = {}) => {
    return useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post(endpoint, data)
            return res.data
        },
        ...options
    })
}