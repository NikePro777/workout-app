import express from "express"

import { protect } from "../middleware/auth.middleware.js"

import { getUserProfile } from "./user.controller.js"

const router = express.Router()

// перед тем как вызывать getUserProfile сначала будет проверка (protect)
router.route("/profile").get(protect, getUserProfile)

export default router
