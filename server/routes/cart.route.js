import express from 'express'
import { updatedCart } from '../controllers/cart.controller.js';
import authUser from '../middleware/authUser.js';

const cartRouter = express.Router();

cartRouter.post("/", authUser, updatedCart)

export default cartRouter