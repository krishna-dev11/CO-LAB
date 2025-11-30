import express from "express";
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-frontend-domain.com"], // Add your frontend URLs
    credentials: true, // Allow cookies to be sent with requests
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

//user routes
app.use("/api/user", userRoutes);

// Authentication routes
app.use("/api/auth", authRoutes);

//team routes
import teamRoutes from "./routes/team.route.js";
app.use("/api/team", teamRoutes);

//workspace routes
import workspaceRoutes from "./routes/workspace.route.js";
app.use("/api/workspace", workspaceRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
