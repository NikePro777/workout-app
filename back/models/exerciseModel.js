import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    times: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    minimize: false, // чтобы невведенные данные у пользователя возвращать, даже если они пустые обьекты
    timestamps: true,
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
export default Exercise;
