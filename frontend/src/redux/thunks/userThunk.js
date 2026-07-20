import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "../../services/user.service";

// ==============================
// Profile
// ==============================

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getProfile();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile",
      );
    }
  },
);

// ==============================
// Users
// ==============================

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getAllUsers();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

export const getAllSellers = createAsyncThunk(
  "user/getAllSellers",
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getAllSellers();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch sellers",
      );
    }
  },
);

export const getSingleUser = createAsyncThunk(
  "user/getSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      return await userService.getSingleUser(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user",
      );
    }
  },
);

// ==============================
// Seller
// ==============================

export const applyForSeller = createAsyncThunk(
  "user/applyForSeller",
  async (_, { rejectWithValue }) => {
    try {
      return await userService.applyForSeller();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to apply for seller",
      );
    }
  },
);

export const approveSeller = createAsyncThunk(
  "user/approveSeller",
  async (id, { rejectWithValue }) => {
    try {
      return await userService.approveSeller(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to approve seller",
      );
    }
  },
);

export const rejectSeller = createAsyncThunk(
  "user/rejectSeller",
  async (id, { rejectWithValue }) => {
    try {
      return await userService.rejectSeller(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reject seller",
      );
    }
  },
);

// ==============================
// User Status
// ==============================

export const banUser = createAsyncThunk(
  "user/banUser",
  async (id, { rejectWithValue }) => {
    try {
      return await userService.banUser(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to ban user",
      );
    }
  },
);

export const unbanUser = createAsyncThunk(
  "user/unbanUser",
  async (id, { rejectWithValue }) => {
    try {
      return await userService.unbanUser(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to unban user",
      );
    }
  },
);

export const suspendUser = createAsyncThunk(
  "user/suspendUser",
  async (id, { rejectWithValue }) => {
    try {
      return await userService.suspendUser(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to suspend user",
      );
    }
  },
);

export const unsuspendUser = createAsyncThunk(
  "user/unsuspendUser",
  async (id, { rejectWithValue }) => {
    try {
      return await userService.unsuspendUser(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to unsuspend user",
      );
    }
  },
);
