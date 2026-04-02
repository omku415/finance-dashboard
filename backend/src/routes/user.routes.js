import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import  protect  from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const router = express.Router();

// All routes below are admin-only
router.use(protect, authorize("admin"));

router.get("/", getUsers);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;