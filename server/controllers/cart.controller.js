import User from "../models/User.js";


// Updated User CartData : /api/carts
export const updatedCart = async (req, res) => {
    try {
        const {  cartItems } = req.body;
        const id = req.user.id

        await User.findByIdAndUpdate(id, { cartItems })

        res.status(200).json({ success: true, message: "Cart Updated" })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message })
    }
}