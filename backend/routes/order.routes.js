import express from "express";
import * as orderController from "../controllers/order.controller.js";
import protect from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

/* ===========================
   User Routes
=========================== */

// Place order
router.post("/", protect, orderController.createOrder);

// Get logged-in user's orders
router.get("/my-orders", protect, orderController.myOrders);

// Get single order
router.get("/:orderId", protect, orderController.getSingleOrder);

// Cancel order
router.patch("/:orderId/cancel", protect, orderController.cancelOrder);

/* ===========================
   Seller Routes
=========================== */

// Get seller's orders
router.get(
  "/seller/orders",
  protect,
  authorize("SELLER"),
  orderController.getSellerOrders,
);

/* ===========================
   Admin Routes
=========================== */

// Get all orders
router.get("/", protect, authorize("ADMIN"), orderController.getAllOrders);

// Update order status
router.patch(
  "/:orderId/status",
  protect,
  authorize("ADMIN"),
  orderController.adminUpdateOrderStatus,
);

// Update payment status
router.patch(
  "/:orderId/payment-status",
  protect,
  authorize("ADMIN"),
  orderController.updatePaymentStatus,
);

export default router;
