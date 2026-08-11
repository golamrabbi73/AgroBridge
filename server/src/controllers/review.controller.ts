import { Request, Response } from "express";
import {
  createReview,
  getProductReviews,
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

export const getProductReviewsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const productId = Number(req.params.productId);

    const reviews = await getProductReviews(productId);

    res.json({
      success: true,
      data: reviews,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};