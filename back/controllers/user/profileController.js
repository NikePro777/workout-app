import asyncHandler from "express-async-handler";
import ExerciseLog from "../../models/exerciseLogModel.js";
import User from "../../models/userModel.js";
// @desc Get user profile
// @route Get /api/users/profile
// @accets Private

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  const execiseLogByUser = await ExerciseLog.find({
    user: user._id,
    completed: true,
  }); // получили лог выполненного упражнения
  let countExerciseTimesCompleted = 0;
  execiseLogByUser.forEach((log) => {
    countExerciseTimesCompleted += log.times.length;
  });
  res.json(countExerciseTimesCompleted);
});
