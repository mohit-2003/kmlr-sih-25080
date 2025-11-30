import * as AuthService from "../services/auth.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs"; // needed for hashing
import jwt from "jsonwebtoken"; // if needed for login


export const register = async (req, res) => {
  try {
    const user = await AuthService.registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.loginUser(email, password);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: "Email not found" });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP + expiry (10 minutes)
    user.reset_otp = otp;
    user.reset_otp_expiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP generated successfully",
      otp: otp, // only for testing (remove in production)
    });

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || user.reset_otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.reset_otp_expiry) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // Hash new password
    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    user.reset_otp = null;
    user.reset_otp_expiry = null;
    await user.save();

    return res.json({
      success: true,
      message: "Password reset successful",
    });

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};


export const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    // 1️⃣ Find the user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 2️⃣ Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Old password is incorrect" });
    }

    // 3️⃣ Hash new password
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    return res.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};