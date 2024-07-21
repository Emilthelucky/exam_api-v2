import express from "express";
import {
  createExamWithQuestions,
  getAllExams,
  getExamById,
} from "../controllers/examController.js";

const examRouter = express.Router();

examRouter.get("/", getAllExams);
examRouter.post("/create", createExamWithQuestions);
examRouter.get("/:id", getExamById);

export { examRouter };
