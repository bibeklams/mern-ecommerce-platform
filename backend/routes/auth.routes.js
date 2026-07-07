import express from "express";
const router = express.Router();

import * as authController from "../controllers/auth.controller.js";
import protect from "../middleware/auth.middleware.js";

// Register
router.post("/register", authController.register);

// Verify email
router.post("/verify-email", authController.verifyEmail);

router.post("/login", authController.login);
router.post("/google-login", authController.googleLogin);
// Refresh token (NO protect)
router.post("/refreshToken", authController.refreshToken);

router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-reset-otp", authController.verifyResetOtp);
router.patch("/reset-password", authController.resetPassword);
// Logout (protected)
router.post("/logout", protect, authController.logout);

// Logout from all devices (protected)
router.post("/logout-all", protect, authController.logoutFromAllDevice);

export default router;
