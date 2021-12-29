import { Router } from "express";
import * as productsController from '../controllers/products.controller';

const router = Router();

router.delete('/:productId', productsController.deleteProductById)
router.get('/:productId', productsController.getProductById)
router.get('/', productsController.getProducts)
router.post('/', productsController.createProduct)
router.put('/:productId', productsController.updateProductById)

export default router;