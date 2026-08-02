import { createAsyncThunk } from "@reduxjs/toolkit";
import * as reviewService from "../../services/review.service";

const getErrorMessage = (error) =>
  error.response?.data?.message || "Something went wrong";

// ======================================
// Create Review
// ======================================

export const createReview = createAsyncThunk(
  "review/createReview",
  async ({ productId, data }, { rejectWithValue }) => {
    try {
      return await reviewService.createReview(productId, data);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// ======================================
// Get Product Reviews
// ======================================

export const getProductReviews = createAsyncThunk(
  "review/getProductReviews",
  async (productId, { rejectWithValue }) => {
    try {
      return await reviewService.getProductReviews(productId);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// ======================================
// Seller Reviews
// ======================================

export const getSellerReviews = createAsyncThunk(
  "review/getSellerReviews",
  async (_, { rejectWithValue }) => {
    try {
      return await reviewService.getSellerReviews();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// ======================================
// Update Review
// ======================================

export const updateReview = createAsyncThunk(
  "review/updateReview",
  async ({ reviewId, data }, { rejectWithValue }) => {
    try {
      return await reviewService.updateReview(reviewId, data);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// ======================================
// Delete Review
// ======================================

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      return await reviewService.deleteReview(reviewId);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);
