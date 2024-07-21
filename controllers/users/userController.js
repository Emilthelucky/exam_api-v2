import { userModel } from "../../models/userModel.js";
import { responseError } from "../../utilities/responseError.js";
import { responseSuccess } from "../../utilities/responseSuccess.js";
import { Hash } from "../../security/passwordHash.js";
import { Compare } from "../../security/passwordCompare.js";
import { createToken } from "../../utilities/JWT/createToken.js";
import {
  checkLogin,
  checkRegister,
} from "../../utilities/CheckFields/check.js";
import { emailValidation } from "../../utilities/checkEmail/email.js";
import { validatePassword } from "../../utilities/strongPassword/password.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    if (users.length === 0) {
      return responseError(res, "There are no active registered users");
    }
    return responseSuccess(res, users);
  } catch (error) {
    return responseError(res, "Error retrieving users");
  }
};

const getUserByUserId = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return responseError(res, "No user found");
    }
    return responseSuccess(res, user);
  } catch (error) {
    return responseError(res, "Error retrieving user");
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (
      checkRegister(res, {
        username,
        email,
        password,
      })
    )
      return;

    if (emailValidation(res, email)) return;
    if (validatePassword(res, password)) return;

    const existedUser = await userModel.findOne({ username });
    if (existedUser) {
      return responseError(res, "User exists");
    } else {
      const hashedPassword = await Hash(password);
      const newUser = await userModel.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      return responseSuccess(res, {
        user: newUser,
        message: "User registered successfully",
      });
    }
  } catch (error) {
    return responseError(res, error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      checkLogin(res, {
        username,
        password,
      })
    )
      return;

    const user = await userModel.findOne({ username });
    if (!user) {
      return responseError(res, "User not found");
    }
    const checkPassword = await Compare(password, user.password);
    if (!checkPassword) {
      return responseError(res, "Password is incorrect");
    }

    const token = createToken(user._id);

    return responseSuccess(res, {
      user,
      token,
    });
  } catch (error) {
    return responseError(res, error);
  }
};

export { getAllUsers, getUserByUserId, registerUser, loginUser };
