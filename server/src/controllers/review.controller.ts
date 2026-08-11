import { Request, Response } from "express";
import {
  createReview,
  getAllReviews,
  getProductReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../services/review.service.js";

export const createReviewController = async (
  req: Request,
  res: Response,
) => {
  try {
    const review = await createReview(req.body);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create review",
    });
  }
};

export const getAllReviewsController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const reviews = await getAllReviews();

    res.json({
      success: true,
      message: "Reviews retrieved successfully",
      data: reviews,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};

export const getProductReviewsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const productId = Number(req.params.productId);
    if (isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const reviews = await getProductReviews(productId);

    res.json({
      success: true,
      message: "Product reviews retrieved successfully",
      data: reviews,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product reviews",
    });
  }
};

export const getReviewByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review ID",
      });
    }

    const review = await getReviewById(id);

    res.json({
      success: true,
      message: "Review retrieved successfully",
      data: review,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Review not found",
    });
  }
};

export const updateReviewController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review ID",
      });
    }

    const review = await updateReview(id, req.body);

    res.json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update review",
    });
  }
};

export const deleteReviewController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review ID",
      });
    }

    await deleteReview(id);

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete review",
    });
  }
};