import express from "express";
const router = express.Router();
import {
  createBooking,
  deleteBooking,
  getBooking,
  updateBooking,
} from "../controllers/booking.js";

// Create a new booking
router.post("/createbookings", createBooking);
// router.get("/bookings/count", countAllBookings); // Add this line

// Get a booking by ID
router.get("/bookings/:id", getBooking);

// Update a booking
router.put("/bookings/:id", updateBooking);

// Delete a booking
router.delete("/bookings/:id", deleteBooking);

export default router;
