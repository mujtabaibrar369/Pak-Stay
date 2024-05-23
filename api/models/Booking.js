import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema(
  {
    room: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Room",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    bookingStatus: {
      type: String,
      enum: ["Confirmed", "Cancelled", "Pending"], // Possible booking statuses
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid", "Pending"], // Payment statuses
      default: "Pending",
    },
    specialRequests: {
      type: String,
      default: "", // Additional requests or comments
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default mongoose.model("Booking", bookingSchema);
