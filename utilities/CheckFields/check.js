export const checkLogin = (res, data) => {
  if (!data.username) {
    res.status(400).json({
      message: "Username daxil edin",
      error: true,
    });
    return true;
  }

  if (!data.password) {
    res.status(400).json({
      message: "Password daxil edin",
      error: true,
    });
    return true;
  }

  return false;
};

export const checkRegister = (res, data) => {
  if (!data.username) {
    res.status(400).json({
      message: "Username daxil edin",
      error: true,
    });
    return true;
  }

  if (!data.email) {
    res.status(400).json({
      message: "Email daxil edin",
      error: true,
    });
    return true;
  }

  if (!data.password) {
    res.status(400).json({
      message: "Password daxil edin",
      error: true,
    });
    return true;
  }

  return false;
};
