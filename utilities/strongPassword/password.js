export const validatePassword = (res, password) => {
  if (password.length < 8) {
    res.status(400).json({
      message: "Password en az 8 simvoldan ibaret olmali",
      error: true,
    });
    return true;
  }
  return false;
};
