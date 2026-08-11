import { Request, Response } from "express";
import {
  createBooking,
  getBookings,
} from "../services/booking.service.js";

export const createBookingController = async (
  req: Request,
  res: Response,
) => {
  try {
    const booking = await createBooking(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create booking",
    });
  }
};

export const getBookingsController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const bookings = await getBookings();

    res.json({
      success: true,
      data: bookings,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};