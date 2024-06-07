import Booking from "../models/Booking.js";

// Create a new booking
export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (err) {
    res.json({ message: err.message });
  }
};

// Get a booking by ID
export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a booking
export const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedBooking);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json("The booking has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};
// Count all bookings
export const countAllBookings = async (req, res) => {
  try {
    const count = await Booking.countDocuments({});
    res.status(200).json(count);
  } catch (err) {
    res.status(500).json(err);
  }
};
// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
};
