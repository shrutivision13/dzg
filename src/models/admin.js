import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    salesArea: {
      type: Array,
    },
    role: {
      type: String,
      default: "User",
      trim: true,
    },
  },
  { timestamps: true }
);
const admin = mongoose.models.admin || mongoose.model("admin", adminSchema);
export default admin;
