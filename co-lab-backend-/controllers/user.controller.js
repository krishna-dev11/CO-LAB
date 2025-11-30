// controllers/userController.js
import User from "../models/user.model.js";
import Team from "../models/team.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // if using middleware to attach user

    const user = await User.findById(userId).select("-password");

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // Get all teams where the user is a member or creator
    const teams = await Team.find({
      $or: [{ members: userId }, { createdBy: userId }],
    })
      .populate("members", "name email") // optional
      .lean();

    // Transform teams into `workspaces`
    const workspaces = teams.map((team) => ({
      id: team._id.toString(),
      name: team.name,
      files: Object.values(team.project).filter(Boolean).length, // canvas, doc, chat
      members: team.members.length,
      role:
        team.createdBy.toString() === userId.toString() ? "Owner" : "Member",
    }));

    // Extract `projects` from team.project.*
    const projects = [];
    teams.forEach((team) => {
      const baseProject = {
        workspace: team.name,
      };

      if (team.project.canvas?.versions?.length) {
        projects.push({
          ...baseProject,
          id: team._id.toString() + "-canvas",
          name: "Canvas Project",
          createdAt: team.createdAt,
          updatedAt: team.project.canvas.lastUpdatedAt || team.updatedAt,
          comments: 0,
        });
      }

      if (team.project.doc?.versions?.length) {
        projects.push({
          ...baseProject,
          id: team._id.toString() + "-doc",
          name: "Doc Project",
          createdAt: team.createdAt,
          updatedAt: team.updatedAt,
          comments: 0,
        });
      }

      if (team.project.chat?.length) {
        projects.push({
          ...baseProject,
          id: team._id.toString() + "-chat",
          name: "Chat Project",
          createdAt: team.createdAt,
          updatedAt: team.updatedAt,
          comments: team.project.chat.length,
        });
      }
    });

    const profile = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: null, // if you add image later
      createdAt: user.createdAt,
      workspaces,
      projects,
    };

    return res.json({ success: true, user: profile });
  } catch (err) {
    console.error("Error fetching profile:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
