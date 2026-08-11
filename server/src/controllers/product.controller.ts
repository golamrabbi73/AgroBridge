import { Request, Response } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../services/product.service.js";

export const createProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const product = await createProduct(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create product",
    });
  }
};

export const getProductsController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const products = await getProducts();

    res.json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const getProductByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await getProductById(id);

    res.json({
      success: true,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Product not found",
    });
  }
};

export const updateProductController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

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
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    await deleteProduct(id);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete product",
    });
  }
};