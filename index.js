import express from "express";
import dotenv from "dotenv";
import { questionRouter } from "./view/questionRoute.js";
import { ConnectDB } from "./configurations/dbConnection.js";
import { examRouter } from "./view/examRoute.js";
import cors from "cors";
import { importData } from "./controllers/questionController.js";
import { userRouter } from "./view/user/userRoute.js";
import cookieParser from "cookie-parser";

ConnectDB();
// importData()

const app = express();

app.use(cors());

const HOST = "0.0.0.0";

dotenv.config();

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/question", questionRouter);
app.use("/exam", examRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  return res.send("hi");
});

setInterval(() => {
  const request = async () => {
    console.log("xd");
    await fetch("https://amu-exam-api-v2.onrender.com");
    await fetch("https://amu-pdfimtahani.onrender.com");
  };

  request();
}, 1000 * 60 * 1);

app.listen(port, HOST, () => {
  console.log(`App is running on ${port}`);
});

export default app;
