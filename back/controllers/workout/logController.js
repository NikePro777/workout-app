import asyncHandler from "express-async-handler";
import ExerciseLog from "../../models/exerciseLogModel.js";
import WorkoutLog from "../../models/workoutLogModel.js";
import Workout from "../../models/workoutModel.js";
// @desc Create new workotLog
// @route POST /api/workouts/log
// @accets Private

export const createNewWorkoutLog = asyncHandler(async (req, res) => {
  const { workoutId } = req.body;
  const user = req.user._id;
  const workout = await Workout.findById(workoutId).populate("exercise");
  if (workout) {
    const workoutLog = await WorkoutLog.create({
      user,
      workout: workoutId,
    });

    const logs = workout.exercise.map((ex) => {
      let timeArray = [];
      for (let i = 0; i < ex.times; i++) {
        timeArray.push({
          weight: 0,
          repeat: 0,
        });
      }

      return {
        user,
        exercise: ex._id,
        times: timeArray,
        workoutLog: workoutLog._id,
      };
    });

    const createdExLogs = await ExerciseLog.insertMany(logs);
    const exLogIds = createdExLogs.map((log) => log._id);
    const foundWorkoutLog = await WorkoutLog.findById(workoutLog._id);
    foundWorkoutLog.exerciseLogs = exLogIds;
    const updatedWorkoutLog = await foundWorkoutLog.save();
    res.json(updatedWorkoutLog);
  } else {
    res.status(404);
    throw new Error("Workout not found");
  }
});

// @desc GET workout Log
// @route GET /api/workouts/log/:id
// @accets Private

export const getWorkoutLog = asyncHandler(async (req, res) => {
  const workoutLog = await WorkoutLog.findById(req.params.id)
    .populate("workout")
    .populate({
      path: "exerciseLogs",
      populate: {
        path: "exercise",
      },
    })
    .lean();
  const minutes = Math.ceil(workoutLog.workout.exercises.length * 3.7);
  res.json({ ...workoutLog, minutes });
});

// @desc GET workout Log completed
// @route GET /api/workouts/log/completed
// @accets Private

export const updateCompleteWorkoutLog = asyncHandler(async (req, res) => {
  const { logId } = req.body;
  const currentLog = await WorkoutLog.findById(logId);
  if (!currentLog) {
    res.status(404);
    throw new Error("Данный лог не найден");
  }
  currentLog.completed = true;
  const updatedLog = await currentLog.save();
  res.json(updatedLog);
});
