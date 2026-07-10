import express from "express";
import * as cartController from "../controllers/cart.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:productId", protect, cartController.addToCart);
router.get("/", protect, cartController.myCart);
router.patch("/:productId", protect, cartController.updateCart);
router.get("/", protect, cartController.countCart);
router.get("/:productId", protect, cartController.deleteCart);
router.delete("/", protect, cartController.deleteCart);
router.delete("/", protect, cartController.clearCart);

export default router;
