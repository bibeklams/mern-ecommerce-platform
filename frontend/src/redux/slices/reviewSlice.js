import { createSlice } from "@reduxjs/toolkit";
import {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
} from "../thunks/reviewThunk";

const initialState = {
  reviews: [],

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
    builder

      // Create
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.reviews.unshift(action.payload.review);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get
      .addCase(getProductReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;

        state.reviews = state.reviews.map((review) =>
          review._id === action.payload.review._id
            ? action.payload.review
            : review,
        );
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;

        state.reviews = state.reviews.filter(
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
