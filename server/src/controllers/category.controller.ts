import { Request, Response } from "express";
import {
  createCategory,
  getCategories,
} from "../services/category.service.js";

export const createCategoryController = async (
  req: Request,
  res: Response,
) => {
  try {
    const category = await createCategory(req.body);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create category",
    });
  }
};

export const getCategoriesController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const categories = await getCategories();

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};