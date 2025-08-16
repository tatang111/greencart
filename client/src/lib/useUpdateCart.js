import { axiosInstance } from "@/api/axiosInstance"
import { useStore } from "@/store/useStore"
import { useEffect } from "react"
import { toast } from "sonner"

export const useUpdateCart = () => {
    const cartItems = useStore(state => state.cartItems)
    const setCartItems = useStore(state => state.setCartItems)
    const user = useStore(state => state.user)

    const updatedCart = async () => {
        try {
            const { data } = await axiosInstance.post("/carts", { cartItems })
            if (!data?.success) {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            updatedCart()
        }
    }, [cartItems])
    return null
}