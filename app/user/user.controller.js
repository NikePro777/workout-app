import asyncHandler from "express-async-handler"

//@desc Get User profile
//@route GET /api/users/profile
//@access Privet
import { prisma } from "../prisma.js"
import { UserFields } from "../utils/user.utils.js"

export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: 1
		},
		select: UserFields
	})
	res.json(user)
})
