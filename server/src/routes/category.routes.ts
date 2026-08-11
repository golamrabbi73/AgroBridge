import { Router } from "express";
import {
  createCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/category.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { categorySchema, updateCategorySchema } from "../schemas/category.schema.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(categorySchema),
  createCategoryController,
);

router.get("/", getCategoriesController);
router.get("/:id", getCategoryByIdController);
router.patch("/:id", authenticate, validate(updateCategorySchema), updateCategoryController);
router.put("/:id", authenticate, validate(updateCategorySchema), updateCategoryController);
router.delete("/:id", authenticate, deleteCategoryController);

export default router;