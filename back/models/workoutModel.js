import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const workoutSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    exercises: [
      {
        type: ObjectId,
        ref: "Exercise",
        required: true,
      },
    ],
  },
  {
    minimize: false, // чтобы невведенные данные у пользователя возвращать, даже если они пустые обьекты
    timestamps: true,
  }
);

const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;
