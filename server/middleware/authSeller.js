import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
    const { sellertoken } = req.cookies;

    if (!sellertoken) {
        return res.status(401).json({ success: false, message: 'Not authorized' })
    }

    try {
        const tokenDecode = jwt.verify(sellertoken, process.env.JWT_SECRET);

        if (tokenDecode.email === process.env.SELLER_EMAIL) {
            next();
        } else {
            return res.status(401).json({ success: false, message: 'Not authorized' })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Not authorized' })
    }
}

export default authSeller;