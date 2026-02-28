import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createChallenge,
  getChallenges,
  joinChallenge,
  updateProgress
} from "../controllers/challengeController.js";

const router = express.Router();

// Create challenge
router.post("/", protect, createChallenge);

// Get all challenges
router.get("/", protect, getChallenges);

// Join challenge
router.post("/:id/join", protect, joinChallenge);

// Update progress
router.put("/:challenge_id", protect, updateProgress);

export default router;