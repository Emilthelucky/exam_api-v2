import { questionModel } from "../models/questionModel.js";
import { responseSuccess } from "../utilities/responseSuccess.js";
// import { data } from './data.js'

export const getAllQuestions = async (req, res) => {
  const questions = await questionModel.find();

  return responseSuccess(res, questions);
};

export const getQuestionByNumber = async (req, res) => {
  const questionNumber = req.params.questionNumber;

  const question = await questionModel.findOne({ number: questionNumber });
  return responseSuccess(res, question);
};

export const getQuestionsByInterval = async (req, res) => {
  const { start, end } = req.body;

  const questions = await questionModel.find({
    $expr: {
      $and: [
        { $gte: [{ $toInt: "$number" }, start] },
        { $lte: [{ $toInt: "$number" }, end] },
      ],
    },
  });

  return responseSuccess(res, questions);
};

export const importData = async () => {
  try {
    // Yeni verileri yükle
    await questionModel.insertMany(data);

    console.log("Veri yükleme başarılı!");
  } catch (error) {
    console.error("Veri yükleme hatası:", error);
  }
};

// const deleteDocumentsByCategory = async (category) => {
//     try {
//         const result = await questionModel.deleteMany({ category: category })
//         console.log(`${result.deletedCount} documents deleted.`)
//     } catch (error) {
//         console.error('Error deleting documents:', error)
//     }
// }

// // Kullanım:
// deleteDocumentsByCategory('Yoluxucu Xəstəliklər, MPF, 3-cü kurs, AZ, 2024')
