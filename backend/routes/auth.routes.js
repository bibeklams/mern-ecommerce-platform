import express from "express";
const router = express.Router();

import * as authController from "../controllers/auth.controller.js";
import protect from "../middleware/auth.middleware.js";

// Register
router.post("/register", authController.register);

// Verify email
router.post("/verify-email", authController.verifyEmail);

router.post("/login", authController.login);
// Refresh token (NO protect)
router.post("/refreshToken", authController.refreshToken);

// Logout (protected)
router.post("/logout", protect, authController.logout);

// Logout from all devices (protected)
router.post(
  "/logoutFromAllDevice",
  protect,
  authController.logoutFromAllDevice,
);

export default router;
