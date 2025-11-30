import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  forgetPassword,
  resetPassword,
  checkAuth,
  resendVerificationEmail,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Authentication routes
router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").post(logout);
router.route("/resend-verification-email").post(resendVerificationEmail);
router.route("/verify-email").post(verifyEmail);
router.route("/forget-password").post(forgetPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/check-auth").get(verifyToken, checkAuth);

//Authenticated routes

export default router;
