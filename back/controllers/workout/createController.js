import asyncHandler from "express-async-handler";
import WorkoutLog from "../../models/workoutLogModel.js";
// @desc Create new workotLog
// @route POST /api/workouts/log
// @accets Private

export const createNewWorkoutLog = asyncHandler(async (req, res) => {
  const { workoutId } = req.body;

  const workoutLog = await WorkoutLog.create({
    user: req.user._id,
    workout: workoutId,
  });
  res.json(workoutLog);
});
