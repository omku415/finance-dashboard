import express from "express";
import protect from "../middleware/auth.middleware.js";
import { getDashboard,getAnalytics } from "../controllers/dashboard.controller.js";
import authorize from "../middleware/role.middleware.js"
const router = express.Router();

// 🔒 Protected route
router.get("/", protect, getDashboard);

router.get(
  "/analytics",
  protect,
  authorize("analyst", "admin"),
  getAnalytics
);

export default router;