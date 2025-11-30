import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    description: {
      type: String,
      required: true,
    },
    project: {
      canvas: {
        currentData: {
          elements: Array,
          appState: Object,
        },
        versions: [
          {
            data: Object,
            savedAt: Date,
          },
        ],
        lastUpdatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        lastUpdatedAt: Date,
      },
      doc: {
        versions: [
          {
            content: String, // Markdown, HTML, or JSON from editor
            savedAt: Date,
          },
        ],
      },
      chat: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          message: String,
          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    invitedEmails: [
      {
        type: String,
      },
    ],
    invitationToken: String,
    invitationTokenExpiry: Date,
    workspaces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        default: null,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);
export default Team;
