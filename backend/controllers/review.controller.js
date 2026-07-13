import * as reviewService from "../services/review.service.js";

export const createReview = async (req, res, next) => {
  try {
    const result = await reviewService.createReview(
      req.user.id,
      req.params.productId,
      req.body,
    );
    res.status(201).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const getProductReviews = async (req, res, next) => {
  try {
    const result = await reviewService.getProductReviews(req.params.productId);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const updateReview = async (req, res, next) => {
  try {
    const result = await reviewService.updateReview(
      req.user.id,
      req.params.reviewId,
      req.body,
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
    const result = await reviewService.deleteReview(
      req.user.id,
      req.params.reviewId,
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
