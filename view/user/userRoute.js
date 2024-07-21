import express from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
  getUserByUserId,
} from "../../controllers/users/userController.js";
import { authToken } from "../../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:userId", getUserByUserId);
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

export { userRouter };
