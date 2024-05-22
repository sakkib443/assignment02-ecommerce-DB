import { Schema, model } from 'mongoose';
import { Inventory, Product, Variants } from './product.interface';

const VariantsSchema = new Schema<Variants>({
  type: { type: String },
  value: { type: String },
});
const InventorySchema = new Schema<Inventory>({
  quantity: { type: Number },
  inStock: { type: Boolean },
});

const ProductSchema = new Schema<Product>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number },
  category: { type: String },
  tags: [{ type: String }],
  variants: [VariantsSchema],
  inventory: InventorySchema,
});

export const ProductModel = model<Product>('ProductModel', ProductSchema);
