import mongoose from "mongoose";

export const connectDB = (async) => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ... надеюсь".cyan.underline);
  } catch (e) {
    console.error(`Error: ${e.message}`.red.underline.bold);
    process.exit(1);
  }
};
