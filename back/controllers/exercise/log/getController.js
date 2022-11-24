import asyncHandler from "express-async-handler";
import { reBuildTimes } from "../../../helpers/exerciseLog.js";
import ExerciseLog from "../../../models/exerciseLogModel.js";
// @desc Get execiseLog
// @route GET /api/exercises/log/:id
// @accets Private

export const getExerciseLog = asyncHandler(async (req, res) => {
  const exerciseLog = await ExerciseLog.findById(req.params.id)
    .populate("exercise", "name imageName")
    .lean(); // lean - преобразует в обьект (возвращает обьект)

  if (!exerciseLog) {
    res.status(404);
    throw new Error("Лог не найден!");
  }
  const prevExerciseLogs = await ExerciseLog.find({
    user: req.user._id,
    exercise: exerciseLog._id,
  }).sort({ createdAt: "desc" });

  const prevExLog = prevExerciseLogs[0];

  let newTimes = reBuildTimes(exerciseLog);

  if (prevExLog) newTimes = reBuildTimes(exerciseLog, prevExLog);

  res.json({
    ...exerciseLog,
    times: newTimes,
  });
});

// @desc    Get logs of exercise
// @route   GET /api/exercises/log
// @access  Private
export const getExerciseLogList = asyncHandler(async (req, res) => {
	const exerciseLogs = await ExerciseLog.find({
		user: req.user._id,
		completed: true,
	})
		.populate('exercise', 'name imageName')
		.select('exercise createdAt')
		.lean()

	if (!exerciseLogs) {
		res.status(404)
		throw new Error('Логи не найдены!')
	} else res.json(exerciseLogs)
})