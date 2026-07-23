import express from "express";
import * as reviewController from "../controllers/review.controller.js";
import protect from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
const router = express.Router();

// Create review
router.post("/:productId", protect, reviewController.createReview);

// Get all reviews of a product
router.get("/product/:productId", reviewController.getProductReviews);

// Update own review
router.patch("/:reviewId", protect, reviewController.updateReview);

// Delete own review
router.delete("/:reviewId", protect, reviewController.deleteReview);
router.get(
  "/seller",
  protect,
  authorize("SELLER"),
  reviewController.getSellerReviews,
);
export default router;
