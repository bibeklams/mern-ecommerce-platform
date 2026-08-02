import { createSlice } from "@reduxjs/toolkit";

import {
  createReview,
  getProductReviews,
  getSellerReviews,
  updateReview,
  deleteReview,
} from "../thunks/reviewThunk";

const initialState = {
  reviews: [],
  sellerReviews: [],

  loading: false,
  error: null,
  success: null,
};

const reviewSlice = createSlice({
  name: "review",

  initialState,

  reducers: {
    clearReviewError: (state) => {
      state.error = null;
    },

    clearReviewSuccess: (state) => {
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder;

    // ======================================
    // Create Review
    // ======================================

    builder
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })

      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })

      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ======================================
    // Product Reviews
    // ======================================

    builder
      .addCase(getProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
      })

      .addCase(getProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ======================================
    // Seller Reviews
    // ======================================

    builder
      .addCase(getSellerReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSellerReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerReviews = action.payload.reviews;
      })

      .addCase(getSellerReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ======================================
    // Update Review
    // ======================================

    builder
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })

      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;

        state.reviews = state.reviews.map((review) =>
          review._id === action.payload.review._id
            ? action.payload.review
            : review,
        );

        state.sellerReviews = state.sellerReviews.map((review) =>
          review._id === action.payload.review._id
            ? action.payload.review
            : review,
        );
      })

      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ======================================
    // Delete Review
    // ======================================

    builder
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })

      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;

        state.reviews = state.reviews.filter(
          (review) => review._id !== action.meta.arg,
        );

        state.sellerReviews = state.sellerReviews.filter(
          (review) => review._id !== action.meta.arg,
        );
      })

      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReviewError, clearReviewSuccess } = reviewSlice.actions;

export default reviewSlice.reducer;
