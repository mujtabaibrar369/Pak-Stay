import express from "express";
const router = express.Router();
import {
  createBooking,
  deleteBooking,
  getBooking,
  updateBooking,
  countAllBookings,
  getAllBookings,
} from "../controllers/booking.js";

// Create a new booking
router.post("/createbookings", createBooking);
router.get("/countBookings", countAllBookings); // Add this line
router.get("/getAllBookings", getAllBookings);

// Get a booking by ID
router.get("/:id", getBooking);

// Update a booking
router.post("/:id", updateBooking);

// Delete a booking
router.delete("/:id", deleteBooking);

export default router;
