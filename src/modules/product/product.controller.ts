import { Request, Response } from 'express';
import { ProductServices } from './product.service';

import ProductJoiValidationSchema from './product.validation';

const CreatProductController = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const { error } = ProductJoiValidationSchema.validate(productData);
    const result = await ProductServices.creatProduct(productData);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Your Data is not valid',
        error: error.details,
      });
    }

    res.json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err: unknown) {
    res.status(400).json({
      success: false,
      message: 'Product not update',
      error: err,
    });
  }
};

const GetAllProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await ProductServices.GetAllProduct(searchTerm);
    if (result.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Product cold not find',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err: unknown) {
    res.status(400).json({
      success: false,
      message: 'Product cold not find',
      error: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await ProductServices.findSingleProduct(id);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err: unknown) {
    res.status(400).json({
      success: false,
      message: 'Product cold not find',
      error: err,
    });
  }
};

const UpdateAProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const result = await ProductServices.UpdateAProduct(productId, req.body);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product dont update',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (err: unknown) {
    res.status(400).json({
      success: false,
      message: 'Product dont update',
      error: err,
    });
  }
};

const DeleteAProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = ProductServices.DeleteAProdect(id);
    if (result) {
      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (err: unknown) {
    res.status(400).json({
      success: false,
      message: 'Product dont Deleted',
      error: err,
    });
  }
};

export const ProductController = {
  CreatProductController,
  GetAllProduct,
  getSingleProduct,
  UpdateAProduct,
  DeleteAProduct,
};
