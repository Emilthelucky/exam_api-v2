import { examModel } from "../models/examModel.js";
import { questionModel } from "../models/questionModel.js";
import { responseError } from "../utilities/responseError.js";
import { responseSuccess } from "../utilities/responseSuccess.js";

export const getAllExams = async (req, res) => {
  let exams = await examModel.find().populate("questions");

  return responseSuccess(res, exams);
};

export const getExamById = async (req, res) => {
  const id = req.params.id;
  let exam = await examModel.findById(id).populate("questions");

  return responseSuccess(res, exam);
};

export const createExamWithQuestions = async (req, res) => {
  const { name } = req.body;
  const existedExam = await examModel.findOne({ name });

  if (!existedExam) {
    let exam = await examModel.create({ name });
    const questions = await questionModel.find({ category: name });

    exam.questions = questions.map((q) => q._id);
    await exam.save();

    exam = await exam.populate("questions");

    return responseSuccess(res, exam);
  } else {
    return responseError(res, "Bu sinaq dbda var");
  }
};
