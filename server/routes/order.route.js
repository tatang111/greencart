import express from 'express';
import authUser from '../middleware/authUser.js';
import { getAllOrders, getUserOrderById, placeOrderCOD, placeOrderStripe } from '../controllers/order.controller.js';
import authSeller from '../middleware/authSeller.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.get('/seller', authSeller, getAllOrders)
orderRouter.get('/:userId', authUser, getUserOrderById)

export default orderRouter