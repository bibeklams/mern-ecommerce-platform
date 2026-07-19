import { createAsyncThunk } from "@reduxjs/toolkit";
import * as cartService from "../../services/cart.service";

// Get Cart
export const getMyCart = createAsyncThunk(
  "cart/getMyCart",
  async (_, { rejectWithValue }) => {
    try {
      return await cartService.getMyCart();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart",
      );
    }
  },
);

// Count Cart
export const countCart = createAsyncThunk(
  "cart/countCart",
  async (_, { rejectWithValue }) => {
    try {
      return await cartService.countCart();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to count cart",
      );
    }
  },
);

// Add To Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, { rejectWithValue }) => {
    try {
      return await cartService.addToCart(productId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add cart",
      );
    }
  },
);

// Update Cart
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      return await cartService.updateCart({
        productId,
        quantity,
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart",
      );
    }
  },
);

// Delete Cart
export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (productId, { rejectWithValue }) => {
    try {
      return await cartService.deleteCart(productId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete cart item",
      );
    }
  },
);

// Clear Cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      return await cartService.clearCart();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart",
      );
    }
  },
);
