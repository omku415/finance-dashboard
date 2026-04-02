import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// 🔐 Register
export const registerUser = async (data) => {
  const { name, email, password, role } = data;

  // check existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = generateToken(user);

  return {
    user,
    token,
  };
};

// 🔐 Login
export const loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  if (user.status === "inactive") {
    throw new Error("User is inactive");
  }

  const token = generateToken(user);

  return {
    user,
    token,
  };
};