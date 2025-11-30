import express from "express";
import {
  createWorkspaceController,
  deleteWorkspaceController,
  loadWorkspaceCanvasController,
  saveWorkspaceCanvasController,
  getWorkspaceOfTeamController,
  getUserWorkspacesController,
} from "../controllers/workspace.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.route("/create/:teamId").post(verifyToken, createWorkspaceController);
router
  .route("/:workspaceId/save-canvas")
  .post(verifyToken, saveWorkspaceCanvasController);
router
  .route("/canvas/:workspaceId")
  .get(verifyToken, loadWorkspaceCanvasController);
router
  .route("/delete/:workspaceId")
  .delete(verifyToken, deleteWorkspaceController);
router.route("/team/:teamId").get(verifyToken, getWorkspaceOfTeamController);
router.route("/recent").get(verifyToken, getUserWorkspacesController);
export default router;
