import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './modules/product/product.routes';
import { OrderRouter } from './modules/order/order.routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRouter);

app.get('/', (req: Request, res: Response) => {
  const a = 'Server is running';
  res.send(a);
});

export default app;
