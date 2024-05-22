import { Request, Response } from 'express';
import { OrderService } from './order.service';
import OrderValidatoionJoi from './order.validation';

const CreateOrderController = async (req: Request, res: Response) => {
  try {
    const OrderData = req.body;
    const { error } = OrderValidatoionJoi.validate(OrderData);


    const result = await OrderService.CreatOrderService(req.body);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Your Data is not valid',
        error: error.details,
      });
    }
    
    res.json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      let errorMessage = 'Product not found';
      let statusCode = 500;

      if (err.message === 'Insufficient quantity available in inventory') {
        errorMessage = 'Insufficient quantity available in inventory';
        statusCode = 400;
      }

      res.status(statusCode).json({
        success: false,
        message: errorMessage,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unexpected error occurred',
        error: err,
      });
    }
  }
};

const GetAllOrderController = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const result = await OrderService.GetAllOrderService(email);

    if (result.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Orders could not be found',
      });
    }

    const message = email
      ? 'Orders fetched successfully for user email!'
      : 'Orders fetched successfully!';

    res.status(200).json({
      success: true,
      message: message,
      data: result,
    });
  } catch (err: unknown) {
    res.status(400).json({
      success: false,
      message: 'Orders could not find',
      error: err,
    });
  }
};

export const OrderController = {
  CreateOrderController,
  GetAllOrderController,
};
