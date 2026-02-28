import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import streakRoutes from "./routes/streakRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
  res.send("Habit Tracker API Running !");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/streaks", streakRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/analytics", analyticsRoutes);

// Error Middleware
app.use(errorHandler);

export default app;