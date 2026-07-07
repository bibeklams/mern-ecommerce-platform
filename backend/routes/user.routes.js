import express from "express";
import * as userController from "../controllers/user.controller.js";
import protect from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

// Profile
router.get("/profile", protect, userController.getProfile);

// Admin
router.get("/", protect, authorize("ADMIN"), userController.getAllUsers);
router.get(
  "/sellers",
  protect,
  authorize("ADMIN"),
  userController.getAllSellers,
);
router.get("/:id", protect, authorize("ADMIN"), userController.getSingleUser);

// Update status
router.patch("/:id/ban", protect, authorize("ADMIN"), userController.banUser);
router.patch(
  "/:id/unban",
  protect,
  authorize("ADMIN"),
  userController.unbanUser,
);
router.patch(
  "/:id/suspend",
  protect,
  authorize("ADMIN"),
  userController.suspendUser,
);
router.patch(
  "/:id/unsuspend",
  protect,
  authorize("ADMIN"),
  userController.unSuspendUser,
);

export default router;
