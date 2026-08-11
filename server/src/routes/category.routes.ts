import { Router } from "express";
import {
  createCategoryController,
  getCategoriesController,
} from "../controllers/category.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { categorySchema } from "../schemas/category.schema.js";

const router = Router();

router.post(
  "/",
  validate(categorySchema),
  createCategoryController,
);

router.get("/", getCategoriesController);

export default router;