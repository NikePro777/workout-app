// Тут
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"

import { prisma } from "../prisma.js"
import { UserFields } from "../utils/user.utils.js"

export const protect = asyncHandler(async (req, res, next) => {
	let token

	if (req.headers.authorization?.startsWith("Bearer")) {
		token = req.header.authorization.split(" ")[1]
		// Проверяем есть ли токен. (он начинается как bearer token) сплитим через пробел, и берем именно второй элемент (без бирера)

		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		// получаем раскодированный токен, а в него мы ложили userId, забираем его и по нему будем определять пользователя

		const userFound = await prisma.user.findUnique({
			where: {
				id: decoded.id
			},
			select: UserFields
		})
		// нашли пользователя который был и помещаем его в следующий реквест запрос

		if (userFound) {
			req.user = userFound
			next() // переход к следующей функции нашего приложения
		} else {
			res.status(401)
			throw new Error("Не авторизован, токен неверный")
		}
		// Суть в том что этого авторизованнного пользователя мы можем взять из любой точки нашего приложения
	}

	// Еще проверяем есть ли токен
	if (!token) {
		res.status(401)
		throw new Error("Не авторизован, токена нет")
	}
})
