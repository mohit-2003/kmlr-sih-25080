import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const registerUser = async (data) => {
  const { name, email, password, role, department_id } = data;

  // Check if user exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    department_id,
    created_at: new Date(),
    updated_at: new Date(),
  });

  return newUser;
};
