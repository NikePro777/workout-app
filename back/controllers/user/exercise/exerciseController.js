import asyncHandler from "express-async-handler";
import Exercise from "../../models/userModel.js";
// @desc Add new execise
// @route POST /api/exercise
// @accets Private

export const addNewExercise = asyncHandler(async (req, res) => {
  const { name, times, image } = req.body;
  const exercise = await Exercise.create({
    name,
    times,
    image,
  });
  res.json(exercise);
});
