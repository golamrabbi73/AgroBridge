import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { productSchema } from "../schemas/product.schema.js";
import {
  createProductController,
  getProductsController,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controller.js";

const router = Router();

router.post(
  "/",
  validate(productSchema),
  createProductController
);

router.get("/", getProductsController);

router.patch("/:id", updateProductController);

router.delete("/:id", deleteProductController);

export default router;