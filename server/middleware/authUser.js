import jwt from "jsonwebtoken"

const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized" })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
            req.user = { id: tokenDecode.id }
        } else {
            return res.status(401).json({ success: false, message: "Not authorized" })
        }
        next()
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid or expired token" })
    }
}

export default authUser;