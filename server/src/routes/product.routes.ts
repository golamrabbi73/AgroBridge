import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { productSchema } from "../schemas/product.schema.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  createProductController,
  getProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controller.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(productSchema),
  createProductController
);

router.get("/", getProductsController);
router.get("/:id", getProductByIdController);
router.patch("/:id", authenticate, updateProductController);
router.put("/:id", authenticate, updateProductController);
router.delete("/:id", authenticate, deleteProductController);

export default router;