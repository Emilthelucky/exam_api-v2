import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "exams",
  },
  category: {
    type: String,
    required: true,
  },
  number: {
    type: String,
  },
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
  other_answers: {
    type: Array,
  },
});

export const questionModel = mongoose.model("questions", questionSchema);
