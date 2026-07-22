import { createSlice } from "@reduxjs/toolkit";

import {
  getMyCart,
  countCart,
  addToCart,
  updateCart,
  deleteCart,
  clearCart,
} from "../thunks/cartThunk";

const initialState = {
  items: [],
  count: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    clearCartError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ====================
      // Get Cart
      // ====================

      .addCase(getMyCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMyCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.carts;
      })

      .addCase(getMyCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ====================
      // Count Cart
      // ====================

      .addCase(countCart.fulfilled, (state, action) => {
        state.count = action.payload.count;
      })

      // ====================
      // Add To Cart
      // ====================

      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addToCart.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ====================
      // Update Cart
      // ====================

      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateCart.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ====================
      // Delete Cart
      // ====================

      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteCart.fulfilled, (state, action) => {
        state.loading = false;

        state.items = state.items.filter(
          (item) => item.product._id !== action.meta.arg,
        );

        state.count = state.items.length;
      })

      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ====================
      // Clear Cart
      // ====================

      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.count = 0;
      })

      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCartError } = cartSlice.actions;

export default cartSlice.reducer;
