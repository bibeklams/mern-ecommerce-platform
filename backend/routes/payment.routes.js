import express from "express";
import protect from "../middleware/auth.middleware.js";
import * as paymentController from "../controllers/payment.controller.js";

const router = express.Router();

// =========================
// Khalti
// =========================

router.post(
  "/khalti/initiate",
  protect,
  paymentController.initiateKhaltiPayment,
);

router.post("/khalti/verify", protect, paymentController.verifyKhaltiPayment);

// =========================
// eSewa
// =========================

router.post("/esewa/initiate", protect, paymentController.initiateEsewaPayment);

router.post("/esewa/verify", protect, paymentController.verifyEsewaPayment);

export default router;
