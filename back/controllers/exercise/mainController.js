import asyncHandler from "express-async-handler";
import Exercise from "../../models/exerciseModel.js";
// @desc Create new execise
// @route POST /api/exercises
// @accets Private

export const createNewExercise = asyncHandler(async (req, res) => {
  const { name, times, imageName } = req.body;
  const exercise = await Exercise.create({
    name,
    times,
    imageName,
  });
  res.json(exercise);
});

// @desc Update exercise
// @route PUT /api/exercises
// @accets Private

export const updateExercise = asyncHandler(async (req, res) => {
  const { name, times, imageName, exerciseId } = req.body;
  const exercise = await Exercise.findById(exerciseId);
  if (!exercise) {
    res.status(404);
    throw new Error("Данное упражнение не найдено!");
  }

  exercise.times = times;
  exercise.imageName = imageName;
  exercise.name = name;

  const updatedExercise = await exercise.save();
  res.json(updatedExercise);
});

// @desc delete exercise
// @route DELETE /api/exercises
// @accets Private

export const deleteExercise = asyncHandler(async (req, res) => {
  const { exerciseId } = req.body;
  const exercise = await Exercise.findById(exerciseId);
  if (!exercise) {
    res.status(404);
    throw new Error("Данное упражнение не найдено!");
  }

  await exercise.remove();
  res.json({ message: "Упражнение удалено" });
});

// @desc get exercises
// @route GET /api/exercises
// @accets Private

export const getExercises = asyncHandler(async (req, res) => {
  const exercises = await Exercise.find({});
  res.json(exercises);
});
