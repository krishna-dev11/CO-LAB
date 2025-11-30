// new file: workspace.controller.js
import {
  createWorkspace,
  saveWorkspaceCanvas,
  loadWorkspaceCanvas,
  deleteWorkspace,
  getWorkspaceOfTeam,
  getUserWorkspaces,
} from "../services/workspace.service.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const createWorkspaceController = AsyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const { name } = req.body;
  const workspace = await createWorkspace(name, teamId, req.userId);
  if (!workspace) {
    return res
      .status(400)
      .json({ success: false, message: "Workspace not created" });
  }
  res.status(201).json({
    success: true,
    message: "Workspace created successfully",
    workspace,
  });
});

export const saveWorkspaceCanvasController = AsyncHandler(async (req, res) => {
  const { workspaceId } = req.params;
  const { elements, appState } = req.body;
  const response = await saveWorkspaceCanvas(
    workspaceId,
    elements,
    appState,
    req.userId
  );
  if (!response) {
    return res
      .status(400)
      .json({ success: false, message: "Canvas not saved" });
  }
  res.status(200).json({
    success: true,
    message: "Canvas saved successfully",
    response,
  });
});

export const loadWorkspaceCanvasController = AsyncHandler(async (req, res) => {
  const { workspaceId } = req.params;
  const response = await loadWorkspaceCanvas(workspaceId, req.userId);
  if (!response) {
    return res.status(404).json({
      success: false,
      message: "Canvas not found",
    });
  }
  res
    .status(200)
    .json({ success: true, message: "Canvas loaded successfully", response });
});

export const deleteWorkspaceController = AsyncHandler(async (req, res) => {
  const { workspaceId } = req.params;
  console.log(workspaceId);
  const response = await deleteWorkspace(workspaceId, req.userId);
  if (!response) {
    return res
      .status(404)
      .json({ success: false, message: "Workspace not found" });
  }
  res.status(200).json({
    success: true,
    message: "Workspace deleted successfully",
    response,
  });
});

export const getWorkspaceOfTeamController = AsyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const response = await getWorkspaceOfTeam(teamId, req.userId);
  if (!response) {
    return res.status(404).json({
      success: false,
      message: "Workspaces not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Workspaces loaded successfully",
    response,
  });
});

export const getUserWorkspacesController = AsyncHandler(async (req, res) => {
  const projects = await getUserWorkspaces(req.userId);
  if (!projects) {
    return res
      .status(400)
      .json({ success: false, message: "No projects found" });
  }
  res.status(200).json({
    success: true,
    message: "Projects fetched successfully",
    projects,
  });
});
