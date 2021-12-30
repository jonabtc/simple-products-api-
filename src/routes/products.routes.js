import { Router } from "express";
import * as productsController from '../controllers/products.controller';
import { authJwt } from "../middlewares";

const router = Router();

router.get('/', productsController.getProducts)
router.post('/', [authJwt.verifyToken, authJwt.isModerator], productsController.createProduct)
router.get('/:productId', productsController.getProductById)
router.put('/:productId', [authJwt.verifyToken, authJwt.isModerator], productsController.updateProductById)
router.delete('/:productId', [authJwt.verifyToken, authJwt.isModerator], productsController.deleteProductById)

export default router;