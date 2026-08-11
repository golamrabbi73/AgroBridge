import { Router } from "express";
import {
  createReviewController,
  getAllReviewsController,
  getProductReviewsController,
  getReviewByIdController,
  updateReviewController,
  deleteReviewController,
} from "../controllers/review.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { reviewSchema, updateReviewSchema } from "../schemas/review.schema.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(reviewSchema),
  createReviewController,
);

router.get("/", getAllReviewsController);
router.get("/product/:productId", getProductReviewsController);
router.get("/:id", getReviewByIdController);
router.patch("/:id", authenticate, validate(updateReviewSchema), updateReviewController);
router.put("/:id", authenticate, validate(updateReviewSchema), updateReviewController);
router.delete("/:id", authenticate, deleteReviewController);

export default router;