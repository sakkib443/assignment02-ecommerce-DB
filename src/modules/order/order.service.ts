import { ProductModel } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const CreatOrderService = async (orderData: TOrder) => {
  const product = await ProductModel.findById(orderData.productId);
  if (!product) {
    throw new Error('Product not found');
  }
  if (product.inventory.quantity < orderData.quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }
  product.inventory.quantity -= orderData.quantity;
  product.inventory.inStock = product.inventory.quantity > 0;
  await product.save();

  const result = await Order.create(orderData);

  return result;
};

const GetAllOrderService = async (email: string) => {
  if (email) {
    const result = await Order.find({ email });
    return result;
  } else {
    const result = Order.find();
    return result;
  }
};

export const OrderService = {
  CreatOrderService,
  GetAllOrderService,
};
