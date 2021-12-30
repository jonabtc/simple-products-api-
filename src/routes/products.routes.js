import { Router } from "express";
import * as productsController from '../controllers/products.controller';
import { verifyToken } from "../middlewares";

const router = Router();

router.delete('/:productId', verifyToken, productsController.deleteProductById)
router.get('/:productId', productsController.getProductById)
router.get('/', productsController.getProducts)
router.post('/', verifyToken, productsController.createProduct)
router.put('/:productId', verifyToken, productsController.updateProductById)

export default router;