import express from "express";
import protect from "../middleware/auth.middleware.js";
import * as notificationController from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protect, notificationController.myNotifications);

router.get("/count", protect, notificationController.countNotification);

router.patch("/read-all", protect, notificationController.markAllAsRead);

router.patch(
  "/:notificationId/read",
  protect,
  notificationController.markAsRead,
);

router.delete(
  "/:notificationId",
  protect,
  notificationController.deleteNotification,
);

router.delete("/", protect, notificationController.clearAllNotifications);

export default router;
