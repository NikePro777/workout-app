import asyncHandler from "express-async-handler";
import ExerciseLog from "../../models/exerciseLogModel.js";
import User from "../../models/userModel.js";
import WorkoutLog from "../../models/workoutLogModel.js";
// @desc Get user profile
// @route Get /api/users/profile
// @accets Private

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password").lean();

  const execiseLogByUser = await ExerciseLog.find({
    user: user._id,
    completed: true,
  }); // получили лог выполненного упражнения

  let countExerciseTimesCompleted = 0;
  let kgs = 0;

  execiseLogByUser.forEach((log) => {
    countExerciseTimesCompleted += log.times.length;
    log.times.forEach((item) => {
      kgs += item.weight;
    });
  });
  const minutes = Math.ceil(countExerciseTimesCompleted * 2.3);
  const workouts = await WorkoutLog.find({
    user: user._id,
    completed: true,
  }).countDocuments(); // countDocuments - высчитывает количество ( крч длина взятого обьекта)
  res.json({ ...user, minutes, workouts, kgs });
});
