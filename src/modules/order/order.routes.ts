import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/', OrderController.CreateOrderController);
router.get('/', OrderController.GetAllOrderController);

export const OrderRouter = router;
