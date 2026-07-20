import { createSlice } from "@reduxjs/toolkit";
import {
  addToWishlist,
  getMyWishlist,
  removeFromWishlist,
  isWishlisted,
  countWishlist,
} from "../thunks/wishlistThunk";

const initialState = {
  wishlist: [],
  count: 0,
  isWishlisted: false,

  loading: false,
  error: null,
  success: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    clearWishlistError: (state) => {
      state.error = null;
    },

    clearWishlistSuccess: (state) => {
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Add
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.wishlist.push(action.payload.wishlist);
        state.count++;
        state.isWishlisted = true;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get
      .addCase(getMyWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.wishlist;
      })
      .addCase(getMyWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;

        state.wishlist = state.wishlist.filter(
          (item) => item.product._id !== action.meta.arg,
        );

        state.count = Math.max(0, state.count - 1);
        state.isWishlisted = false;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Check
      .addCase(isWishlisted.fulfilled, (state, action) => {
        state.isWishlisted = action.payload.isWishlisted;
      })

      // Count
      .addCase(countWishlist.fulfilled, (state, action) => {
        state.count = action.payload.count;
      });
  },
});

export const { clearWishlistError, clearWishlistSuccess } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
