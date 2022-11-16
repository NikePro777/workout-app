import asyncHandler from "express-async-handler";
import Exercise from "../../models/exerciseModel.js";
// @desc Add new execiseLog
// @route POST /api/exercises/log
// @accets Private

export const addNewExerciseLog = asyncHandler(async (req, res) => {
  const { exerciseId } = req.body;
  let timesArray = [];
  const count = [0, 1, 2];
  for (let i = 0; i < times; i++) {
    timesArray.push({
      weight: 0,
      repeat: 0,
    });
  }
  console.log(times);
  //   const exerciseLog = await ExerciseLog.create({
  //     user: req.user._id,
  //     exercise: exerciseId,
  //     times: timesArray,
  //   });
  //   res.json(exerciseLog);
});
