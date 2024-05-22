import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/', ProductController.CreatProductController);
router.get('/', ProductController.GetAllProduct);
router.get('/:id', ProductController.getSingleProduct);
router.put('/:id', ProductController.UpdateAProduct);
router.delete('/:id', ProductController.DeleteAProduct);

export const ProductRoutes = router;
