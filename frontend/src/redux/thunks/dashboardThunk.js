import { createAsyncThunk } from "@reduxjs/toolkit";
import * as dashboardService from "../../services/dashboard.service";

export const getAdminDashboard = createAsyncThunk(
  "dashboard/getAdminDashboard",
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.getAdminDashboard();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load admin dashboard",
      );
    }
  },
);

export const getSellerDashboard = createAsyncThunk(
  "dashboard/getSellerDashboard",
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.getSellerDashboard();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load seller dashboard",
      );
    }
  },
);
