import express from "express";
import * as wishlistController from "../controllers/wishlist.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:productId", protect, wishlistController.createWishlist);

router.get("/", protect, wishlistController.findAllWishlist);

router.delete("/:productId", protect, wishlistController.deleteWishlist);

router.get(
  "/:productId/isWishlisted",
  protect,
  wishlistController.isWishlisted,
);

router.get("/count", protect, wishlistController.countWishlist);

export default router;
