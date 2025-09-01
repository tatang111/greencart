import { Router } from 'express'
import { isSellerAuth, sellerLogin, sellerLogout } from '../controllers/seller.controller.js';
import authSeller from '../middleware/authSeller.js';

const sellerRouter = Router();

sellerRouter.post("/login", sellerLogin);
sellerRouter.get("/is-auth", authSeller, isSellerAuth);
sellerRouter.get("/logout", sellerLogout);


export default sellerRouter