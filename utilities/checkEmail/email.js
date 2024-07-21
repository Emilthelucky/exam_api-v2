const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const emailValidation = (res, email) => {
  if (!validateEmail(email)) {
    res.status(400).json({ message: "Invalid email format" });
    return true; // Indicate there's an error
  }
  return false; // Indicate no error
};
