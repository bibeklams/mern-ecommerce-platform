import { createAsyncThunk } from "@reduxjs/toolkit";
import * as reviewService from "../../services/review.service";

export const createReview = createAsyncThunk(
  "review/createReview",
  async ({ productId, data }, { rejectWithValue }) => {
    try {
      return await reviewService.createReview(productId, data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create review",
      );
    }
  },
);

export const getProductReviews = createAsyncThunk(
  "review/getProductReviews",
  async (productId, { rejectWithValue }) => {
    try {
      return await reviewService.getProductReviews(productId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews",
      );
    }
  },
);

export const updateReview = createAsyncThunk(
  "review/updateReview",
  async ({ reviewId, data }, { rejectWithValue }) => {
    try {
      return await reviewService.updateReview(reviewId, data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update review",
      );
    }
  },
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      return await reviewService.deleteReview(reviewId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete review",
      );
    }
  },
);
