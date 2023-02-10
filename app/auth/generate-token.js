import jwt from "jsonwebtoken"

export const generateToken = userId =>
	jwt.sign(
		{ userId }, // что мы хотим прокинуть

		process.env.ACCESS_TOKEN, // шифрование нашего токена?

		{
			expiresIn: "10d"
		}
	)
// Сколько наш токен будет действовать
