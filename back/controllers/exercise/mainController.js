import asyncHandler from "express-async-handler";
import Exercise from "../../models/exerciseModel.js";
// @desc Add new execise
// @route POST /api/exercises
// @accets Private

export const addNewExercise = asyncHandler(async (req, res) => {
  const { name, times, imageId } = req.body;
  const exercise = await Exercise.create({
    name,
    times,
    imageId,
  });
  res.json(exercise);
});

// @desc Get execise
// @route GET /api/exercises/:id
// @accets Private

// export const addNewExercise = asyncHandler(async (req, res) => {
//   const { name, times, imageId } = req.body;
//   const exercise = await Exercise.create({
//     name,
//     times,
//     imageId,
//   });
//   res.json(exercise);
// });
