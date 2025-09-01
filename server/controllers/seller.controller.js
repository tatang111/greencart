import jwt from "jsonwebtoken";

// Login seller : /api/seller/login
export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" })

            res.cookie('sellertoken', token, {
                httpOnly: true, // Prevent Javascript to access cookie
                secure: process.env.NODE_ENV === 'production' ? true : false,
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF PROTECTION
                maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expiration time
            })

            return res.status(200).json({ success: true, message: 'Logged In' });
        } else {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message })
    }
}

// Seller isAuth : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        return res.status(200).json({ success: true })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// Logout Seller : /api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellertoken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: "/"
        });
        return res.status(200).json({ success: true, message: "Logged out" })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message })
    }
}