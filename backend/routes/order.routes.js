import express from "express";
import * as orderController from "../controllers/order.controller.js";
import protect from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

/*
=================================
USER ROUTES
=================================
*/

// Create Order
router.post("/", protect, orderController.createOrder);

// User Orders
router.get("/my-orders", protect, orderController.myOrders);

// Cancel Order
router.patch("/:orderId/cancel", protect, orderController.cancelOrder);

/*
=================================
SELLER ROUTES
=================================
*/

// Seller Get Orders
router.get(
  "/seller/orders",
  protect,
  authorize("SELLER"),
  orderController.getSellerOrders,
);

// Seller Update Status
router.patch(
  "/seller/orders/:orderId/status",
  protect,
  authorize("SELLER"),
  orderController.sellerUpdateOrderStatus,
);

/*
=================================
ADMIN ROUTES
=================================
*/

// Admin Get All Orders
router.get("/", protect, authorize("ADMIN"), orderController.getAllOrders);

// Admin Update Order Status
router.patch(
  "/:orderId/status",
  protect,
  authorize("ADMIN"),
  orderController.adminUpdateOrderStatus,
);

// Admin Update Payment Status
router.patch(
  "/:orderId/payment-status",
  protect,
  authorize("ADMIN"),
  orderController.updatePaymentStatus,
);

/*
=================================
COMMON ROUTES
=================================
*/

// Get Single Order
// ALWAYS KEEP THIS LAST
router.get("/:orderId", protect, orderController.getSingleOrder);

export default router;
