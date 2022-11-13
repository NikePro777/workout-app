import express from "express";
import { addNewExercise } from "../controllers/exercise/exerciseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addNewExercise); // протект означает что только авторизованные пользователи могут переходить сюда

export default router;
