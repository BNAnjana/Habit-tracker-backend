import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getWeeklyReport,
  getMonthlyReport
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/weekly", protect, getWeeklyReport);
router.get("/monthly", protect, getMonthlyReport);

export default router;