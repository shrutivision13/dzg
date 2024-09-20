import mongoose from "mongoose";

const formNameSchema = new mongoose.Schema(
  {
    formName: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
const formName =
  mongoose.models.formName || mongoose.model("formName", formNameSchema);
export default formName;
