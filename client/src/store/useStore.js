import { toast } from "sonner";
import { create } from "zustand";


export const useStore = create((set, get) => ({
    user: null,
    isSeller: false,
    showUserLogin: false,
    products: [],
    cartItems: {},
    searchQuery: "",
    currency: import.meta.env.VITE_CURRENCY,

    setSearchQuery: (q) => set({ searchQuery: q }),
    addUser: (newUser) => set({ user: newUser }),
    setIsSeller: (isSeller) => set({ isSeller: isSeller }),
    setShowUserLogin: (userLogin) => set({ showUserLogin: userLogin }),
    setProducts: (newProduct) => set(state => ({ products: [...state.products, ...(Array.isArray(newProduct) ? newProduct : [newProduct])] })),
    setCartItems: (newItem) => set({ cartItems: newItem }),

    fetchProducts: async (data) => {
        set({ products: data })
    },

    getCartCount: () => {
        let totalCount = 0;

        for (const item in get().cartItems) {
            totalCount += get().cartItems[item]
        }
        return totalCount
    },

    getCartAmount: () => {
        let totalAmount = 0;

        for (const items in get().cartItems) {
            let itemInfo = get().products.find(product => product._id === items)

            if (get().cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * get().cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100
    },

    addToCart: (itemId) => {
        if (!get().user) {
            return toast.error("You must logged in to add product")
        }

        let cartData = structuredClone(get().cartItems)

        if (cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] = 1
        }
        set({ cartItems: cartData })
        toast.success("Added to Cart")
    },

    updateCartItem: (itemId, quantity) => {
        let cartData = structuredClone(get().cartItems)

        cartData[itemId] = quantity;
        set({ cartItems: cartData });
        toast.success("Cart Updated")
    },

    removeCartItem: (itemId) => {
        let cartData = structuredClone(get().cartItems)

        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId]
            }
        }
        set({ cartItems: cartData })
        toast.success("Remove from Cart")
    }
}))
