import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};
