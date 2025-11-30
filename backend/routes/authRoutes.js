import express from "express";
<<<<<<< HEAD
import { register ,login,forgotPassword,
  resetPassword} from "../controllers/authController.js";
=======
import { register ,login} from "../controllers/authController.js";
>>>>>>> 3a52334df58ecda1113ec133141f45dab0445131

const router = express.Router();

router.post("/register", register);
router.post("/login", login); 
<<<<<<< HEAD


router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
=======
>>>>>>> 3a52334df58ecda1113ec133141f45dab0445131

export default router;
