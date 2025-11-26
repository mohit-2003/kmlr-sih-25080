const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.registerUser = async (data) => {
  const { name, email, password, role, department_id } = data;

  // Check if user already exists
  const existing = await User.findByEmail(email);
  if (existing) {
    throw new Error("Email already registered");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user in DB
  const newUser = await User.createUser({
    name,
    email,
    password_hash: hashedPassword,
    role,
    department_id,
  });

  return newUser;
};
