import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    canvas: {
      currentData: {
        elements: Array,
        appState: {
          type: Object,
          default: null,
        },
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
          content: String,
          savedAt: Date,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Workspace = mongoose.model("Workspace", workspaceSchema);
export default Workspace;
