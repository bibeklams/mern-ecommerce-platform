import * as reviewRepository from "../repositories/review.repository.js";
import * as productRepository from "../repositories/product.repository.js";
import * as orderRepository from "../repositories/order.repository.js";
import * as userRepository from "../repositories/user.repository.js";
import { throwError } from "../utils/errorHandler.js";

const updateProductRating = async (productId) => {
  const reviews = await reviewRepository.findAll({
    product: productId,
  });

  const totalReviews = reviews.length;

  let averageRating = 0;

  if (totalReviews > 0) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

    averageRating = Number((totalRating / totalReviews).toFixed(1));
  }

  await productRepository.updateProduct(productId, {
    averageRating,
    totalReviews,
  });
};
export const createReview = async (userId, productId, data) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throwError("No user found", 404);
  }
  const product = await productRepository.findById(productId);
  if (!product) {
    throwError("No product found", 404);
  }
  const order = await orderRepository.findOne({
    user: userId,
    "items.product": productId,
    orderStatus: "DELIVERED",
  });
  if (!order) {
    throwError("You can only review products you have purchased.", 400);
  }
  const alreadyReview = await reviewRepository.findOne({
    user: userId,
    product: productId,
  });
  if (alreadyReview) {
    throwError("You have already reviewed this product.", 400);
  }
  const review = await reviewRepository.createReview({
    user: userId,
    product: productId,
    ...data,
  });
  await updateProductRating(productId);

  return {
    message: "Review added successfully.",
    review,
  };
};
export const getProductReviews = async (productId) => {
  // Check product
  const product = await productRepository.findById(productId);

  if (!product) {
    throwError("Product not found.", 404);
  }

  // Get reviews
  const reviews = await reviewRepository.findAll({
    product: productId,
  });

  return {
    reviews,
  };
};
export const updateReview = async (userId, reviewId, data) => {
  // Check user
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throwError("User not found.", 404);
  }

  // Check review
  const review = await reviewRepository.findById(reviewId);

  if (!review) {
    throwError("Review not found.", 404);
  }

  // Check ownership
  if (review.user.toString() !== userId) {
    throwError("Unauthorized.", 403);
  }

  // Update review
  const updatedReview = await reviewRepository.updateReview(reviewId, {
    ...data,
  });

  // Update product rating
  await updateProductRating(review.product);

  return {
    message: "Review updated successfully.",
    review: updatedReview,
  };
};
export const deleteReview = async (userId, reviewId) => {
  // Check user
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throwError("User not found.", 404);
  }

  // Check review
  const review = await reviewRepository.findById(reviewId);

  if (!review) {
    throwError("Review not found.", 404);
  }

  // Check ownership
  if (review.user.toString() !== userId) {
    throwError("Unauthorized.", 403);
  }

  // Delete review
  await reviewRepository.deleteReview(reviewId);

  // Update product rating
  await updateProductRating(review.product);

  return {
    message: "Review deleted successfully.",
  };
};
