import { createAsyncThunk } from "@reduxjs/toolkit";
import * as wishlistService from "../../services/wishlist.service";

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      return await wishlistService.addToWishlist(productId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add wishlist",
      );
    }
  },
);

export const getMyWishlist = createAsyncThunk(
  "wishlist/getMyWishlist",
  async (_, { rejectWithValue }) => {
    try {
      return await wishlistService.getMyWishlist();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load wishlist",
      );
    }
  },
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      return await wishlistService.removeFromWishlist(productId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove wishlist",
      );
    }
  },
);

export const isWishlisted = createAsyncThunk(
  "wishlist/isWishlisted",
  async (productId, { rejectWithValue }) => {
    try {
      return await wishlistService.isWishlisted(productId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed");
    }
  },
);

export const countWishlist = createAsyncThunk(
  "wishlist/countWishlist",
  async (_, { rejectWithValue }) => {
    try {
      return await wishlistService.countWishlist();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed");
    }
  },
);
