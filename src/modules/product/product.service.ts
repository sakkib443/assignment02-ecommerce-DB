import { Product } from './product.interface';
import { ProductModel } from './product.model';

const creatProduct = async (playLoad: Product) => {
  const result = await ProductModel.create(playLoad);
  return result;
};

const GetAllProduct = async (searchTerm: string) => {
  if (searchTerm) {
    return await ProductModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ],
    });
  } else {
    return await ProductModel.find();
  }
};

const findSingleProduct = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const UpdateAProduct = async (id: string, playLoad: Partial<Product>) => {
  const result = await ProductModel.findByIdAndUpdate(id, playLoad, {
    new: true,
  });
  return result;
};

const DeleteAProdect = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  creatProduct,
  GetAllProduct,
  findSingleProduct,
  UpdateAProduct,
  DeleteAProdect,
};
