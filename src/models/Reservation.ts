import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
});

export default mongoose.models.Reservation || mongoose.model("Reservation", ReservationSchema);