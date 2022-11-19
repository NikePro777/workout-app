import express from "express";
import { createNewWorkoutLog } from "../controllers/workout/createController.js";
import {
  createNewWorkout,
  getWorkout,
  updateWorkout,
} from "../controllers/workout/workoutController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createNewWorkout).put(protect, updateWorkout); // протект означает что только авторизованные пользователи могут переходить сюда
router.route("/log").post(protect, createNewWorkoutLog);
router.route("/:id").get(protect, getWorkout);

export default router;
