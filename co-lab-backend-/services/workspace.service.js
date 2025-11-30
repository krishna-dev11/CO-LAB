import Workspace from "../models/workspace.model.js";
import Team from "../models/team.model.js";
import User from "../models/user.model.js";
import { isMemberOfTeam } from "../utils/HelperFunction.js";

// workspace.services.js
import { BadRequestError, NotFoundError } from "../utils/error.js"; // optional: for custom error handling

export const getWorkspacesByUser = async (userId) => {
  const workspaces = await Workspace.find({ createdBy: userId }).populate(
    "teams"
  );
  return workspaces;
};

export const updateWorkspace = async (workspaceId, updateData, userId) => {
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) throw new Error("Workspace not found");

  if (workspace.createdBy.toString() !== userId.toString()) {
    throw new Error("Only the creator can update the workspace");
  }

  if (updateData.name) workspace.name = updateData.name;
  await workspace.save();
  return workspace;
};

// Function to create a new workspace
export const createWorkspace = async (name, teamId, userId) => {
  try {
    if (!teamId) throw new Error("Select a team first");
    const team = await Team.findById(teamId);
    if (!team) throw new Error("Team not found", message);
    console.log(team);
    console.log(userId);
    if (!isMemberOfTeam(team, userId)) {
      throw new Error("Unauthorized: User is not a member of the team");
    }
    const newWorkspace = new Workspace({
      name,
      team: teamId,
      createdBy: userId, // assuming the user creating the workspace is logged in
      canvas: {
        elements: [],
        appState: {},
      },
    });

    const workspace = await newWorkspace.save();

    await Team.findByIdAndUpdate(teamId, {
      $push: { workspaces: workspace._id },
    });
    return workspace;
  } catch (error) {
    throw new BadRequestError("Failed to create workspace", error);
  }
};

// Function to save workspace canvas (elements and appState)
export const saveWorkspaceCanvas = async (
  workspaceId,
  elements,
  appState,
  userId
) => {
  try {
    console.log(workspaceId);
    // Fetch the workspace first
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw new NotFoundError("Workspace not found");
    }

    // Check if the user is a member of the team that created this workspace
    const team = await Team.findById(workspace.team); // Assuming workspace has a teamId field that links to the Team model

    if (!team) {
      throw new NotFoundError("Team not found");
    }

    // Check if the user is part of the team
    const isUserInTeam = team.members.some(
      (member) => member.toString() === userId.toString()
    );
    if (!isUserInTeam) {
      throw new NotFoundError("User is not a member of the team");
    }

    // Save the canvas data if the user is authorized
    const updatedWorkspace = await Workspace.findByIdAndUpdate(
      workspaceId,
      {
        $set: {
          "canvas.currentData.elements": elements,
          "canvas.currentData.appState": appState,
          "canvas.lastUpdatedBy": userId,
          "canvas.lastUpdatedAt": Date.now(),
          "canvas.versions": {
            $push: { data: { elements, appState }, savedAt: Date.now() },
          },
        },
      },
      { new: true } // return the updated workspace
    );

    return updatedWorkspace.canvas; // return the updated canvas data
  } catch (error) {
    console.error("Canvas Save Error:", error);
    throw new BadRequestError("Failed to save canvas data");
  }
};

// Function to load workspace canvas
export const loadWorkspaceCanvas = async (workspaceId, userId) => {
  try {
    // Step 1: Get the workspace
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw new NotFoundError("Workspace not found");
    }

    // Step 2: Get the team
    const team = await Team.findById(workspace.team);
    if (!team) {
      throw new NotFoundError("Team not found");
    }

    // Step 3: Check if user is a team member
    const isMember = team.members.some(
      (memberId) => memberId.toString() === userId.toString()
    );
    if (!isMember) {
      throw new NotFoundError("User not authorized to access this canvas");
    }

    // Step 4: Return canvas
    return workspace;
  } catch (error) {
    console.error("Canvas Load Error:", error);
    throw new NotFoundError("Canvas not found");
  }
};

export const deleteWorkspace = async (workspaceId, userId) => {
  try {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw new NotFoundError("Workspace not found");
    }

    const team = await Team.findById(workspace.team);
    if (!team) {
      throw new NotFoundError("Team not found");
    }

    if (
      workspace.createdBy.toString() !== userId.toString() &&
      team.createdBy.toString() !== userId.toString()
    ) {
      throw new UnauthorizedError("Unauthorized to delete workspace");
    }

    await Workspace.findByIdAndDelete(workspaceId);
    team.workspaces.pull(workspaceId);
    await team.save();

    return { success: true, message: "Workspace deleted successfully" };
  } catch (error) {
    console.error("Delete Workspace Error:", error);
    throw new BadRequestError("Failed to delete workspace", error);
  }
};

export const getWorkspaceOfTeam = async (teamId, userId) => {
  try {
    if (!teamId) {
      throw new Error("Team ID is required");
    }

    const team = await Team.findById(teamId);
    if (!team) {
      throw new Error("Team not found");
    }
    const isUserInTeam = isMemberOfTeam(team, userId);
    if (!isUserInTeam) {
      throw new Error("Unauthorized: User is not a member of the team");
    }

    const workspaces = await Workspace.find({ team: teamId }).populate("team");
    if (!workspaces || workspaces.length === 0) {
      return [];
    }

    return workspaces;
  } catch (error) {
    console.error("Error in getWorkspaceOfTeam:", error.message);
    throw error;
  }
};

export const getUserWorkspaces = async (userId, limit = 10, page = 1) => {
  try {
    // Step 1: Find teams the user is a member of
    const teams = await Team.find({ members: userId })
      .select("workspaces")
      .populate("workspaces");

    if (!teams || teams.length === 0) {
      throw new Error("No teams found");
    }
    console.log(teams);

    // Extract and flatten all workspace references
    const workspaceIds = teams.flatMap((team) =>
      team.workspaces.map((ws) => ws._id)
    );
    console.log(workspaceIds);
    // Avoid querying with empty list
    if (!workspaceIds.length) {
      throw new Error("No workspaces found in teams");
    }

    const workspaces = await Workspace.find({
      _id: { $in: workspaceIds },
    }).sort({
      updatedAt: -1,
    });

    return {
      success: true,
      total: workspaces.length,
      data: workspaces,
    };
  } catch (err) {
    console.error("Failed to fetch user workspaces:", err);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
