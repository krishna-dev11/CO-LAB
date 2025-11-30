import {
  addMemberToTeam,
  createTeam,
  deleteTeam,
  getAllTeams,
  getTeamById,
  getTeamByName,
  getTeamMembers,
  loadCanvas,
  removeMemberFromTeam,
  saveCanvas,
  sentInvitationEmail,
  updateTeam,
} from "../services/team.services.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const sentInvitationEmailController = AsyncHandler(async (req, res) => {
  const { email } = req.body;
  const { teamId } = req.params;
  const response = await sentInvitationEmail(email, teamId, req.userId);
  if (!response) {
    return res
      .status(400)
      .json({ success: false, message: "Invitation not sent" });
  }
  res
    .status(200)
    .json({ success: true, message: "Invitation sent successfully", response });
});

export const addMemberToTeamController = AsyncHandler(async (req, res) => {
  const { code } = req.body;
  const team = await addMemberToTeam(req.userId, code);
  if (!team) {
    return res.status(400).json({ success: false, message: "Team not found" });
  }
  res
    .status(200)
    .json({ success: true, message: "Member added successfully", team });
});

export const removeMemberFromTeamController = AsyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const { userId } = req.body;
  const team = await removeMemberFromTeam(teamId, userId);
  if (!team) {
    return res.status(400).json({ success: false, message: "Team not found" });
  }
  res
    .status(200)
    .json({ success: true, message: "Member removed successfully", team });
});

export const getTeamMembersController = AsyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const members = await getTeamMembers(teamId, req.userId);
  if (!members) {
    return res
      .status(400)
      .json({ success: false, message: "No members found" });
  }
  res
    .status(200)
    .json({ success: true, message: "Members fetched successfully", members });
});

export const getTeamByIdController = AsyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const userId = req.userId;
  const team = await getTeamById(teamId, userId);
  if (!team) {
    return res.status(400).json({ success: false, message: "Team not found" });
  }
  res
    .status(200)
    .json({ success: true, message: "Team fetched successfully", team });
});

export const getAllTeamsController = AsyncHandler(async (req, res) => {
  const teams = await getAllTeams(req.userId);
  if (!teams) {
    return res.status(400).json({ success: false, message: "No teams found" });
  }
  res
    .status(200)
    .json({ success: true, message: "Teams fetched successfully", teams });
});

export const createTeamController = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const userId = req.userId;
  const team = await createTeam(name, description, userId);
  if (!team) {
    return res
      .status(400)
      .json({ success: false, message: "Team not created" });
  }
  res
    .status(201)
    .json({ success: true, message: "Team created successfully", team });
});

export const deleteTeamController = AsyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const response = await deleteTeam(teamId, req.userId);
  if (!response) {
    return res.status(400).json({ success: false, message: "Team not found" });
  }
  res
    .status(200)
    .json({ success: true, message: "Team deleted successfully", response });
});

export const updateTeamController = AsyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const { updateData } = req.body;
  const response = await updateTeam(teamId, updateData, req.userId);
  if (!response) {
    return res.status(400).json({ success: false, message: "Team not found" });
  }
  res
    .status(200)
    .json({ success: true, message: "Team updated successfully", response });
});

export const getTeamByNameController = AsyncHandler(async (req, res) => {
  const { name } = req.body;
  console.log(name);
  const team = await getTeamByName(name, req.userId);
  if (!team) {
    return res.status(400).json({ success: false, message: "Team not found" });
  }
  res
    .status(200)
    .json({ success: true, message: "Team fetched successfully", team });
});

// canvas based controllers

export const saveCanvasController = AsyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const { elements, appState } = req.body;
  const response = await saveCanvas(teamId, elements, appState, req.userId);
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

export const loadCanvasController = AsyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const response = await loadCanvas(teamId, req.userId);
  if (!response) {
    return res.status(404).json({
      success: false,
      message: "Canvas not found",
    });
  }
  res
    .status(200)
    .json({ success: true, message: "canvas loaded successfully", response });
});
