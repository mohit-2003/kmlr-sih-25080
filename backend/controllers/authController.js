const AuthService = require("../services/auth");

exports.register = async (req, res) => {
  try {
    const newUser = await AuthService.registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
