import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendEmailVerification,
  sendResetPasswordEmail,
  sendResetPasswordSuccessEmail,
  sendWelcomeEmail,
} from "../nodemailer/emails.js";

import { AsyncHandler } from "../utils/AsyncHandler.js";

export const signup = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const UserAlreadyExists = await User.findOne({ email });
    console.log(UserAlreadyExists);
    if (UserAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken: verificationToken,
      verificationTokenExpiry: Date.now() + 1000 * 60 * 60 * 24,
    });
    await user.save();

    //jwt
    generateTokenAndSetCookie(res, user._id);

    try {
      await sendEmailVerification(user.email, verificationToken);
    } catch (err) {
      console.error("Failed to send verification email", err);
      return res.status(500).json({
        success: false,
        message: "User created but failed to send verification email",
      });
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
      User: {
        ...user._doc,
        password: undefined,
        verificationToken: undefined,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ success: false }, { message: error.message });
  }
});

export const logout = AsyncHandler(async (req, res) => {
  res.clearCookie("token", {});
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordMatched = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();

    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ success: false }, { message: error.message });
  }
});

export const resendVerificationEmail = AsyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Please provide email" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    user.verificationToken = verificationToken;
    user.verificationTokenExpiry = Date.now() + 1000 * 60 * 60 * 24;
    await user.save();
    try {
      await sendEmailVerification(user.email, verificationToken);
    } catch (err) {
      console.error("Failed to send verification email", err);
      return res.status(500).json({
        success: false,
        message: "Failed to send verification email",
      });
    }
    res.status(200).json({
      success: true,
      message: "Verification email sent successfully",
      user: {
        ...user._doc,
        password: undefined,
        verificationToken: undefined,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ success: false }, { message: error.message });
  }
});

export const verifyEmail = AsyncHandler(async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiry: { $gt: Date.now() },
    });
    console.log(code);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    try {
      await sendWelcomeEmail(user.email, user.name);
    } catch (error) {
      console.error("Failed to send welcome email", error);
      return res.status(500).json({
        success: false,
        message: "User verified but failed to send welcome email",
      });
    }
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false }, { message: error.message });
  }
});

export const forgetPassword = AsyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    console.log(resetToken);
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiry = Date.now() + 1000 * 60 * 60 * 1; //1 hour
    await user.save();

    try {
      await sendResetPasswordEmail(
        user.email,
        `${process.env.CLIENT_URL}/reset-password/${resetToken}`
      );
    } catch (error) {
      console.error("Failed to send reset password email", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send reset password email",
      });
    }
    res.status(200).json({
      success: true,
      message: "Reset password link sent to your email",
      user: {
        ...user._doc,
        password: undefined,
        resetPasswordToken: undefined,
      },
    });
  } catch (error) {}
});

export const resetPassword = AsyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiry = undefined;
    await user.save();
    try {
      await sendResetPasswordSuccessEmail(user.email);
    } catch (error) {
      console.error("Failed to send reset password success email", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send reset password success email",
      });
    }
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false }, { message: error.message });
  }
});

export const checkAuth = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
});
