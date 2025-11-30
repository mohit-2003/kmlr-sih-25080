import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
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

export const loginUser=async(email,password)=>{
    const user=await User.findOne({where:{email}});
    if(!user){
        throw new Error("Invalid email or password");
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error("Invalid email or password");
    }

    const token=jwt.sign({
        id:user.id,
        email:user.email,
        role:user.role
    },
process.env.JWT_SECRET,
{expiresIn:"7d"});

return {user,token};
}
