import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tgllahir: {
      type: String,
      required: true,
    },
    nohp: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    ktp: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
