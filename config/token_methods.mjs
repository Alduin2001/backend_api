import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();

export async function getDataFromToken(token) {
  const decoded = await jwt.verify(token, process.env.SECRET_KEY);
  return decoded;
}
export async function setToken(payload){
  const token = await jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'10h'});
  return token;
}
