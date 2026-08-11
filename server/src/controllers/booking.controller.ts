import { Request, Response } from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
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
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

export const getBookingByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await getBookingById(id);

    res.json({
      success: true,
      message: "Booking retrieved successfully",
      data: booking,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "Booking not found",
    });
  }
};

export const updateBookingController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await updateBooking(id, req.body);

    res.json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update booking",
    });
  }
};

export const deleteBookingController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    await deleteBooking(id);

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete booking",
    });
  }
};