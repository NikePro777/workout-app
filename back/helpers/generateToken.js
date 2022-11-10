import jwt from "jsonwebtoken";

export const generateToken = (userId) =>
  jwt.sign(
    {
      userId,
    },
    process.env.ACCETS_TOKEN,
    {
      expiresIn: "10d",
    }
  );
