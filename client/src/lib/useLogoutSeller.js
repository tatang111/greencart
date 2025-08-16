import { axiosInstance } from "@/api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";

export const useLogoutSeller = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async () => {
            const res = await axiosInstance.get("/seller/logout")
            return res.data
        },
        onSuccess: () => {
            toast.success("Logged out");
            navigate("/");
        },
        onError: (err) => {
            toast.error(err.message || 'Logout Failed')
        }
    })
}