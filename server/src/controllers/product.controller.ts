import { Request, Response } from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../services/product.service.js";

export const createProductController = async (
  req: Request,
  res: Response
) => {
  const product = await createProduct(req.body);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
};

export const getProductsController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const products = await getProducts();

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const updateProductController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const product = await updateProduct(id, req.body);

    res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update product",
    });
  }
};

export const deleteProductController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    await deleteProduct(id);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};