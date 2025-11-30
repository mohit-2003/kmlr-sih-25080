import * as AuthService from "../services/auth.js";

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