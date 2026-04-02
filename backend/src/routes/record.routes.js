import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  create,
  getAll,
  update,
  remove,
} from "../controllers/record.controller.js";
import validate from "../middleware/validate.middleware.js";
import { recordSchema } from "../validations/record.validation.js";

const router = express.Router();

// all routes protected
router.use(protect);

router.get("/", getAll);
import authorize from "../middleware/role.middleware.js"; // ✅ import

router.use(protect);

// ✅ All roles can view
router.get("/", getAll);

router.post(
  "/",
  authorize("admin"), // 🔥 ADD THIS
  validate(recordSchema),
  create,
);

router.put(
  "/:id",
  authorize("admin"), // 🔥 ADD
  validate(recordSchema),
  update,
);

router.delete(
  "/:id",
  authorize("admin"), // 🔥 ADD
  remove,
);

export default router;
