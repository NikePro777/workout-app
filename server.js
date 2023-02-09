import "colors"
import dotenv from "dotenv"
import express from "express"
import morgan from "morgan"

import authRoutes from "./app/auth/auth.routes.js"
import { prisma } from "./app/prisma.js"

dotenv.config() //хрень без которой наш файлик env работать не будет

const app = express()

async function main() {
	if (process.env.NODE_ENV === "development") app.use(morgan("dev"))
	// работает благодаря тому что сверху dotenv.config подключили, запустили морган - чтобы логи просматривались

	const PORT = process.env.PORT || 5000

	app.listen(
		PORT,
		console.log(
			`Сервер запустился в режиме ${process.env.NODE_ENV} на порте ${PORT}`.blue
				.bold
		)
	)
	app.use(express.json()) // чтобы все данные входящие и исходящие были в формате json
	app.use("/api/auth", authRoutes)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	}) // после того как наш сервер отработал мы отключаем базу данных
