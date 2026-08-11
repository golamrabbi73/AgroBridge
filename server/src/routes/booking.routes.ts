import { Router } from "express";
import {
  createBookingController,
  getBookingsController,
  getBookingByIdController,
  updateBookingController,
  deleteBookingController,
} from "../controllers/booking.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { bookingSchema, updateBookingSchema } from "../schemas/booking.schema.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(bookingSchema),
  createBookingController,
);

router.get("/", getBookingsController);
router.get("/:id", getBookingByIdController);
router.patch("/:id", authenticate, validate(updateBookingSchema), updateBookingController);
router.put("/:id", authenticate, validate(updateBookingSchema), updateBookingController);
router.delete("/:id", authenticate, deleteBookingController);

export default router;