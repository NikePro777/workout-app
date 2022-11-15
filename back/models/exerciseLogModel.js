import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const exerciseLogSchema = mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    workout: { type: ObjectId, ref: "Workout", required: true },
    exercise: { type: ObjectId, ref: "Exercise", required: true },
    times: [
      {
        completed: { type: Boolean, default: false },
        weight: { type: Number, required: true },
        repeat: { type: Number, required: true },
      },
    ],
  },
  {
    minimize: false, // чтобы невведенные данные у пользователя возвращать, даже если они пустые обьекты
    timestamps: true,
  }
);

const ExerciseLog = mongoose.model("ExerciseLog", exerciseLogSchema);
export default ExerciseLog;
