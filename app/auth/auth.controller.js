import { faker } from "@faker-js/faker"
import { hash } from "argon2"
import asyncHandler from "express-async-handler"

import { prisma } from "../prisma.js"
import { UserFields } from "../utils/user.utils.js"

import { generateToken } from "./generate-token.js"

//@desc Auth user
//@route POST /api/auth/login
//@access Public

export const authUser = asyncHandler(async (req, res) => {
	const user = await prisma.user.findMany({
		where: {
			password1: "fdsf"
		}
	})
	res.json(user)
})

//@desc Register user
//@route POST /api/auth/register
//@access Public

// проверяем пользователя по почте
export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	// Ищем есть ли пользователь с такой почтой
	const isHaveUser = await prisma.user.findUnique({
		where: { email } //  тоже самое что {email: email}
	})

	// Если есть то говорим что уже зареган
	if (isHaveUser) {
		res.status(400)
		throw new Error("Пользователь уже зарегистрирован")
	}

	// если пользователя с такой почтой нет, то создаем его

	const user = await prisma.user.create({
		data: {
			email,
			password: await hash(password),
			name: faker.name.fullName()
		},
		select: UserFields
	})

	// Создаем токен для пользователя

	const token = generateToken(user.id)
	res.json(user, token)
})
