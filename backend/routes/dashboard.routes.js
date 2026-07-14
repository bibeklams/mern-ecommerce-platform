import express from "express";
import * as dashboardController from "../controllers/dashboard.controller.js";
import protect from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

// Admin Dashboard
router.get(
  "/admin",
  protect,
  authorize("ADMIN"),
  dashboardController.getAdminDashboard,
);

// Seller Dashboard
router.get(
  "/seller",
  protect,
  authorize("SELLER"),
  dashboardController.getSellerDashboard,
);

export default router;
