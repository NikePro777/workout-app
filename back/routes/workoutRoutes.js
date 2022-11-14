import express from "express";
import { addNewWorkout } from "../controllers/workout/workoutController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addNewWorkout); // протект означает что только авторизованные пользователи могут переходить сюда

export default router;
