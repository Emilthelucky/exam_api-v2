import { responseError } from "../utilities/responseError.js";
import jwt from "jsonwebtoken";
import { responseSuccess } from "../utilities/responseSuccess.js";

export const authToken = async (req, res, next) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  console.log(token);

  if (!token) {
    return responseError(res, "Not Authorized!");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return responseError(res, err.message);
    } else {
      return responseSuccess(res, {
        user,
        message: "User logged in successfully",
      });
    }
  });
};
