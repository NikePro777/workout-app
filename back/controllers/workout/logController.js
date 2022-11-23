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
