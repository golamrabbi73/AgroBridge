import { Router } from "express";
import {
  createReviewController,
  getProductReviewsController,
} from "../controllers/review.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { reviewSchema } from "../schemas/review.schema.js";

const router = Router();

router.post(
  "/",
  validate(reviewSchema),
  createReviewController,
);

router.get("/product/:productId", getProductReviewsController);

export default router;