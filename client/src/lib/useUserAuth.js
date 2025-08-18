import { axiosInstance } from "@/api/axiosInstance";
import { useStore } from "@/store/useStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useUserAuth = () => {
    const addUser = useStore((state) => state.addUser);
    const setCartItems = useStore((state) => state.setCartItems);

    const { data, refetch } = useQuery({
        queryKey: ["userisAuthh"],
        queryFn: async () => {
            const res = await axiosInstance.get("/user/is-auth");
            return res.data;
        },
        retry: false, // no retry on error
        refetchOnWindowFocus: false, // no recheck when window regains focus
    });

    useEffect(() => {
        if (data?.success === true) {
            addUser(data?.user);
            setCartItems(data?.user.cartItems ?? {});
        }
    }, [data]);

    return {
        data, refetch
    }
}

export default useUserAuth
