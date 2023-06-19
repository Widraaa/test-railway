import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    homestayName: {
      type: String,
      required: true,
    },
    kapasitas: {
      type: Number,
      required: true,
    },
    namalengkap: {
      type: String,
      required: true,
    },
    tglpesan: {
      type: Date,
      required: true,
    },
    tglkeluar: {
      type: Date,
      required: true,
    },
    notel: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
