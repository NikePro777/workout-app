import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
// Config
import { connectDB } from "./config/db.js";
// Middleware
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
// Routes
import userRoutes from "./routes/userRoutes.js";

dotenv.config(); // чтобы эта хрень заработала

connectDB();

const app = express(); // запускаем приложение

if (process.env.NODE_ENV === "development") app.use(morgan("dev")); // если мы в режиме разработки - запускаем морган

app.use(express.json()); // это чтобы ответ в формате JSON нам пришел
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold // желтым жирным в консоли запустится
  )
);
