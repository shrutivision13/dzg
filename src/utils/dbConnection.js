import { form_write_logs } from "@/winston/form/logger";
import { mongoose } from "mongoose";

export const connectToDB = async () => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    form_write_logs({
      message: `MongoDB connected.`,
      log_type: "info",
    });
  } catch (error) {
    throw new Error(error);
  }
};
