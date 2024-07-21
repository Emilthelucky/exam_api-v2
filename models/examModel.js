import mongoose from "mongoose";

const examSchema = mongoose.Schema({
  name: {
    type: String,
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "questions" }],
});

export const examModel = mongoose.model("exams", examSchema);
