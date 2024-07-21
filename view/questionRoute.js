import express from "express";
import {
  getAllQuestions,
  getQuestionByNumber,
  getQuestionsByInterval,
} from "../controllers/questionController.js";

const questionRouter = express.Router();

questionRouter.get("/interval", getQuestionsByInterval);
questionRouter.get("/:questionNumber", getQuestionByNumber);
questionRouter.get("/", getAllQuestions);

export { questionRouter };
