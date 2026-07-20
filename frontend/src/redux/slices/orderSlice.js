import { createSlice } from "@reduxjs/toolkit";

import {
  createOrder,
  getMyOrders,
  getSingleOrder,
  cancelOrder,
  getSellerOrders,
  sellerUpdateOrderStatus,
  getAllOrders,
  adminUpdateOrderStatus,
  updatePaymentStatus,
} from "../thunks/orderThunk";

const initialState = {
  orders: [],
  order: null,

  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",

  initialState,

  reducers: {
    clearOrder(state) {
      state.order = null;
    },

    clearOrderError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================
      // Create Order
      // ==========================

      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.orders.unshift(action.payload.order);
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // My Orders
      // ==========================

      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload.orders;
      })

      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Single Order
      // ==========================

      .addCase(getSingleOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.order = action.payload.order;
      })

      .addCase(getSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Cancel Order
      // ==========================

      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = state.orders.map((order) =>
          order._id === action.payload.order._id ? action.payload.order : order,
        );

        if (state.order?._id === action.payload.order._id) {
          state.order = action.payload.order;
        }
      })

      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Seller Orders
      // ==========================

      .addCase(getSellerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSellerOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload.orders;
      })

      .addCase(getSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Seller Update Status
      // ==========================

      .addCase(sellerUpdateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(sellerUpdateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = state.orders.map((order) =>
          order._id === action.payload.order._id ? action.payload.order : order,
        );

        if (state.order?._id === action.payload.order._id) {
          state.order = action.payload.order;
        }
      })

      .addCase(sellerUpdateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Admin Orders
      // ==========================

      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload.orders;
      })

      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Admin Update Status
      // ==========================

      .addCase(adminUpdateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(adminUpdateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = state.orders.map((order) =>
          order._id === action.payload.order._id ? action.payload.order : order,
        );

        if (state.order?._id === action.payload.order._id) {
          state.order = action.payload.order;
        }
      })

      .addCase(adminUpdateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Payment Status
      // ==========================

      .addCase(updatePaymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = state.orders.map((order) =>
          order._id === action.payload.order._id ? action.payload.order : order,
        );

        if (state.order?._id === action.payload.order._id) {
          state.order = action.payload.order;
        }
      })

      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrder, clearOrderError } = orderSlice.actions;

export default orderSlice.reducer;
