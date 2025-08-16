import { Router } from 'express';
import { upload } from '../configs/multer.js'
import authSeller from '../middleware/authSeller.js';
import { addProduct, changeStock, productById, productList } from "../controllers/product.controller.js"

const productRouter = Router();

productRouter.get("/", productList )
productRouter.get("/:id", productById )
productRouter.post("/", upload.array(["images"]), authSeller, addProduct)
productRouter.put("/", authSeller, changeStock)

export default productRouter