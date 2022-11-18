import asyncHandler from "express-async-handler";
import Workout from "../../models/workoutModel.js";
// @desc Create new workout
// @route POST /api/workouts
// @accets Private

export const createNewWorkout = asyncHandler(async (req, res) => {
  const { name, exerciseIds } = req.body;
  const workout = await Workout.create({
    name,
    exercises: exerciseIds,
  });
  res.json(workout);
});

// @desc get new workout
// @route GET /api/workouts/:id
// @accets Private

export const getWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id)
    .populate("exercises")
    .lean(); // populate - содержание обьекта раскроется (объекта exercises  в нашем случае)
  const minutes = Math.ceil(workout.exercises.length * 3.7);
  res.json({ ...workout, minutes });
});
