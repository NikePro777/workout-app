import asyncHandler from "express-async-handler";
import Exercise from "../../models/exerciseModel.js";
// @desc Create new execise
// @route POST /api/exercises
// @accets Private

export const createNewExercise = asyncHandler(async (req, res) => {
  const { name, times, imageIndex } = req.body;
  const exercise = await Exercise.create({
    name,
    times,
    imageIdx: imageIndex,
  });
  res.json(exercise);
});

// @desc Update exercise
// @route PUT /api/exercises
// @accets Private

export const updateExercise = asyncHandler(async (req, res) => {
  const { name, times, imageIndex, exerciseId } = req.body;
  const exercise = await Exercise.findById(exerciseId);
  if (!exercise) {
    res.status(404);
    throw new Error("Данное упражнение не найдено!");
  }

  exercise.times = times;
  exercise.imageIdx = imageIndex;
  exercise.name = name;

  const updatedExercise = await exercise.save();
  res.json(updatedExercise);
});
