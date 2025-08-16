import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from "./configs/db.js"
import "dotenv/config";
import userRouter from './routes/user.route.js';
import sellerRouter from './routes/seller.route.js';
import connectCloudinary from './configs/cloudinary.js'
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import addressRouter from './routes/address.route.js';
import orderRouter from './routes/order.route.js';
import { stripeWebhooks } from './controllers/order.controller.js';

const app = express();
const port = process.env.PORT || 4000
await connectDB();
await connectCloudinary()

// Allow multiple origins
const allowedOrigins = ['http://localhost:5173']

app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));


app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/api/user", userRouter)
app.use("/api/seller", sellerRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/api/address", addressRouter)
app.use("/api/orders", orderRouter)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

