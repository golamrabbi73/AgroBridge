import { Router } from "express";
import {
  getUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { updateUserSchema } from "../schemas/user.schema.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getUsersController);
router.get("/:id", getUserByIdController);
router.patch("/:id", authenticate, validate(updateUserSchema), updateUserController);
router.delete("/:id", authenticate, deleteUserController);

export default router;
