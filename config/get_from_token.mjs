import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();

export default async function getDataFromToken(token) {
  const decoded = await jwt.verify(token, process.env.SECRET_KEY);
  return decoded;
}
