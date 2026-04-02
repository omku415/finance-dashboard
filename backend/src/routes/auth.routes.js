import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const router = express.Router();

import validate from "../middleware/validate.middleware.js";
import {
  registerSchema,
  loginSchema,
} from "../validations/auth.validation.js";

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

// 🔥 Test Protected Route
router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// 🔥 Admin Only Route
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
});

export default router;