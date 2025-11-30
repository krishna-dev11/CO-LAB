import express from "express";
import {
  createTeamController,
  getTeamByIdController,
  getAllTeamsController,
  addMemberToTeamController,
  removeMemberFromTeamController,
  getTeamMembersController,
  getTeamByNameController,
  deleteTeamController,
  sentInvitationEmailController,
  saveCanvasController,
  loadCanvasController,
} from "../controllers/team.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//authenticated routes
router.route("/create").post(verifyToken, createTeamController);
router.route("/:teamId").get(verifyToken, getTeamByIdController);
router.route("/").get(verifyToken, getAllTeamsController);
router.route("/delete/:teamId").delete(verifyToken, deleteTeamController);
router
  .route("/add-member/:teamId")
  .post(verifyToken, addMemberToTeamController);
router
  .route("/remove-member/:teamId")
  .put(verifyToken, removeMemberFromTeamController);
router.route("/members/:teamId").get(verifyToken, getTeamMembersController);
router
  .route("/send-invite/:teamId")
  .post(verifyToken, sentInvitationEmailController);
router.route("/add-member").post(verifyToken, addMemberToTeamController);
router
  .route("/remove-member/:teamId")
  .put(verifyToken, removeMemberFromTeamController);
// router.route("/name").get(verifyToken, getTeamByNameController);

//canvas based routes
router.route("/:teamId/save-canvas").post(verifyToken, saveCanvasController);
router.route("/:teamId/get-canvas").get(verifyToken, loadCanvasController);
export default router;
