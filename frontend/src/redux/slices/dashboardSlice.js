import { createSlice } from "@reduxjs/toolkit";
import {
  getAdminDashboard,
  getSellerDashboard,
} from "../thunks/dashboardThunk";

const initialState = {
  adminDashboard: null,
  sellerDashboard: null,

  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,

  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================
      // Admin Dashboard
      // ==========================

      .addCase(getAdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.adminDashboard = action.payload;
      })
      .addCase(getAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Seller Dashboard
      // ==========================

      .addCase(getSellerDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSellerDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerDashboard = action.payload;
      })
      .addCase(getSellerDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDashboardError } = dashboardSlice.actions;

export default dashboardSlice.reducer;
