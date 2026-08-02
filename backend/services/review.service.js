import * as reviewRepository from "../repositories/review.repository.js";
import * as productRepository from "../repositories/product.repository.js";
import * as orderRepository from "../repositories/order.repository.js";
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

// ======================================
// Can Review
// ======================================

export const canReviewProduct = async (userId, productId) => {
  const product = await productRepository.findById(productId);

  if (!product) {
    throwError("Product not found.", 404);
  }

  const order = await orderRepository.findOne({
    user: userId,
    orderStatus: "DELIVERED",
    items: {
      $elemMatch: {
        product: productId,
      },
    },
  });

  if (!order) {
    return {
      canReview: false,
      reason: "NOT_PURCHASED",
    };
  }

  const existingReview = await reviewRepository.findOne({
    user: userId,
    product: productId,
  });

  if (existingReview) {
    return {
      canReview: false,
      reason: "ALREADY_REVIEWED",
    };
  }

  return {
    canReview: true,
    reason: null,
  };
};

// ======================================
// Create Review
// ======================================

export const createReview = async (userId, productId, data) => {
  const { canReview } = await canReviewProduct(userId, productId);

  if (!canReview) {
    throwError("You can only review delivered products once.", 400);
  }

  const review = await reviewRepository.createReview({
    user: userId,
    product: productId,
    ...data,
  });

  await updateProductRating(productId);

  return {
    message: "Review submitted successfully.",
    review,
  };
};

// ======================================
// Product Reviews
// ======================================

export const getProductReviews = async (productId) => {
  const product = await productRepository.findById(productId);

  if (!product) {
    throwError("Product not found.", 404);
  }

  const reviews = await reviewRepository.findAll({
    product: productId,
  });

  return {
    reviews,
  };
};

// ======================================
// Update Review
// ======================================

export const updateReview = async (userId, reviewId, data) => {
  const review = await reviewRepository.findById(reviewId);

  if (!review) {
    throwError("Review not found.", 404);
  }

  if (review.user.toString() !== userId) {
    throwError("Unauthorized.", 403);
  }

  const updatedReview = await reviewRepository.updateReview(reviewId, data);

  await updateProductRating(review.product);

  return {
    message: "Review updated successfully.",
    review: updatedReview,
  };
};

// ======================================
// Delete Review
// ======================================

export const deleteReview = async (userId, reviewId) => {
  const review = await reviewRepository.findById(reviewId);

  if (!review) {
    throwError("Review not found.", 404);
  }

  if (review.user.toString() !== userId) {
    throwError("Unauthorized.", 403);
  }

  await reviewRepository.deleteReview(reviewId);

  await updateProductRating(review.product);

  return {
    message: "Review deleted successfully.",
  };
};

// ======================================
// Seller Reviews
// ======================================

export const getSellerReviews = async (sellerId) => {
  const products = await productRepository.findAllProducts(
    { seller: sellerId },
    {
      limit: 100000, // fetch all seller products
    },
  );

  if (!products.length) {
    return {
      reviews: [],
    };
  }

  const productIds = products.map((product) => product._id);

  const reviews = await reviewRepository.findAll({
    product: { $in: productIds },
  });

  return {
    reviews,
  };
};
