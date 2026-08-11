import { Router } from "express";
import {
  createBookingController,
  getBookingsController,
} from "../controllers/booking.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { bookingSchema } from "../schemas/booking.schema.js";

const router = Router();

router.post(
  "/",
  validate(bookingSchema),
  createBookingController,
);

router.get("/", getBookingsController);

export default router;