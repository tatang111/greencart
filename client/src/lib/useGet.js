import { axiosInstance } from "@/api/axiosInstance"
import { useQuery } from "@tanstack/react-query"

export const useGet = (endpoint, queryKey) => {
    return useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const res = await axiosInstance.get(endpoint)
            return res.data
        }
    })
}