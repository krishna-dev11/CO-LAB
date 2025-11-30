import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/profile").get(verifyToken, getUserProfile);

export default router;
