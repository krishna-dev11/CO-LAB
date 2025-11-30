import Team from "../models/team.model.js";
import User from "../models/user.model.js";
import { sendInvitationToUserEmail } from "../nodemailer/emails.js";
import { isMemberOfTeam } from "../utils/HelperFunction.js";
import crypto from "crypto";

// convas based services
export const saveCanvas = async (teamId, elements, appState, userId) => {
  try {
    const team = await Team.findById(teamId);
    if (!team) {
      throw new Error("Team not found");
    }
    const isMember = isMemberOfTeam(team, userId);
    if (!isMember) {
      throw new Error("User not a member of the team");
    }
    team.project.canvas.currentData = { elements, appState };
    team.project.canvas.versions.push({
      data: { elements, appState },
      savedAt: Date.now(),
    });
    team.project.canvas.lastUpdatedBy = userId;
    team.project.canvas.lastUpdatedAt = Date.now();
    if (team.project.canvas.versions.length > 10) {
      team.project.canvas.versions.shift();
    }
    await team.save();
    return team.project.canvas.currentData;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const loadCanvas = async (teamId, userId) => {
  try {
    const team = await Team.findById(teamId);
    if (!team) {
      throw new Error("Team not found");
    }
    const isMember = isMemberOfTeam(team, userId);
    if (!isMember) {
      throw new Error("User not a member of the team");
    }
    const canvasData = team.project.canvas.currentData;
    if (!canvasData) {
      return null;
    }
    return {
      canvasData,
      versions: team.project.canvas.versions,
      lastUpdatedBy: team.project.canvas.lastUpdatedBy,
      lastUpdatedAt: team.project.canvas.lastUpdatedAt,
    };
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

// team based services

export const sentInvitationEmail = async (email, teamId, userId) => {
  try {
    console.log("Sending invitation email to:", email);
    console.log(teamId);
    const team = await Team.findById(teamId);
    if (!team) {
      throw new Error("Team not found");
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (!team.createdBy.toString() === userId.toString()) {
      throw new Error("Only the creator can send invitation email to the team");
    }

    const token = crypto.randomBytes(20).toString("hex");
    team.invitationToken = token;
    team.invitationTokenExpiry = Date.now() + 1 * 24 * 60 * 60 * 1000; //1 day
    if (team.invitedEmails.includes(email)) {
      team.invitedEmails = team.invitedEmails.filter(
        (invitedEmail) => invitedEmail !== email
      );
    }
    team.invitedEmails.push(email);
    await team.save();
    try {
      await sendInvitationToUserEmail(
        email,
        `${process.env.CLIENT_URL}/join-team/${token}`,
        team.name,
        user.name
      );
    } catch (error) {
      console.error("Failed to send invitation email", error);
      throw new Error("Failed to send invitation email");
    }
    return team;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const addMemberToTeam = async (userId, code) => {
  try {
    const team = await Team.findOne({
      invitationToken: code,
      invitationTokenExpiry: { $gt: Date.now() },
    });
    if (!team) {
      throw new Error("Team not found,invalid token or token expired ");
    }
    console.log("Team ID:", team);
    const user = await User.findById(userId); //here userId is the id of the user who is accepting the invitation
    if (!user) {
      throw new Error("User not found");
    }
    console.log("User ID:", userId);
    if (isMemberOfTeam(team, userId)) {
      throw new Error("User already a member of the team");
    }
    if (!team.invitedEmails.includes(user.email)) {
      throw new Error("User not invited to the team");
    }
    team.members.push(userId);
    team.invitationToken = undefined;
    team.invitationTokenExpiry = undefined;
    team.invitedEmails = team.invitedEmails.filter(
      (invitedEmail) => invitedEmail !== user.email
    );
    await team.save();
    return team;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const removeMemberFromTeam = async (teamId, userId) => {
  try {
    const team = await Team.findById(teamId);

    console.log("Team ID:", team);
    if (!team) {
      throw new Error("Team not found");
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (!team.createdBy.toString() === userId.toString()) {
      throw new Error("Only the creator can remove members to the team");
    }
    if (!isMemberOfTeam(team, userId)) {
      throw new Error("User not a member of the team");
    }
    team.members = team.members.filter(
      (member) => member.toString() !== userId.toString()
    );
    await team.save();
    return team;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const getTeamMembers = async (teamId, userId) => {
  try {
    const team = await Team.findById(teamId).populate("members", "name email");
    if (!team) {
      throw new Error("Team not found");
    }
    if (!isMemberOfTeam(team, userId)) {
      throw new Error("User not a member of the team");
    }
    return team.members;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const getTeamById = async (teamId, userId) => {
  try {
    const team = await Team.findById(teamId).populate("members", "name email");
    if (!team) {
      throw new Error("Team not found");
    }
    const isMember = isMemberOfTeam(team, userId);
    if (!isMember) {
      console.log(team.members._id, userId);
      throw new Error("User not a member of the team");
    }
    return team;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const getAllTeams = async (userId) => {
  try {
    const teams = await Team.find({ members: userId })
      .select(
        "-__v -project -workspace -invitationToken -invitationTokenExpiry -invitedEmails"
      )
      .populate("members", "name email");
    if (!teams) {
      throw new Error("No teams found");
    }

    return teams;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const createTeam = async (name, description, createdBy) => {
  try {
    if (!name || !description || !createdBy) {
      throw new Error("Name, description and createdBy are required");
    }
    const teamAlreadyExists = await Team.findOne({ name, createdBy });
    if (teamAlreadyExists) {
      throw new Error("Team already exists");
    }
    const team = new Team({
      name,
      description,
      createdBy,
      members: [createdBy],
      project: {
        canvas: {
          version: [],
        },
        doc: {
          version: [],
        },
      },
    });
    await team.save();
    return team;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const updateTeam = async (teamId, updateData, userId) => {
  try {
    const team = await Team.findById(teamId);
    if (!team) {
      throw new Error("Team not found");
    }
    const isCreator = team.createdBy.toString() === userId.toString();
    const isMember = isMemberOfTeam(team, userId);
    if (!isCreator && !isMember) {
      throw new Error("User is not a member of the team");
    }
    if (isCreator) {
      if (updateData.name) {
        team.name = updateData.name;
      }
      if (updateData.description) {
        team.description = updateData.description;
      }
      if (updateData.members) {
        team.members = updateData.members;
      }
    }

    if (isMember && updateData.project) {
      team.project = updateData.project;
    }

    await team.save();
    return team;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const deleteTeam = async (teamId, userId) => {
  try {
    console.log("Deleting team with ID:", teamId);
    const team = await Team.findById(teamId);
    if (!team) {
      throw new Error("Team not found");
    }
    if (team.createdBy.toString() !== userId.toString()) {
      throw new Error("Only the creator can delete the team");
    }
    const deletedTeam = await Team.findByIdAndDelete(teamId);
    return deletedTeam;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const getTeamByName = async (name, userId) => {
  console.log("Fetching team by name:", name);
  try {
    console.log("User ID:", userId);
    const team = await Team.findOne({ name }); // ✅ Use findOne instead of find
    if (!team) {
      throw new Error("Team not found");
    }

    return team;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};
