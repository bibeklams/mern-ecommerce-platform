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
  // User Orders
  orders: [],

  // Seller Orders
  sellerOrders: [],

  // Admin Orders
  adminOrders: [],

  // Single Order
  order: null,

  // Pagination
  page: 1,
  pages: 1,
  total: 0,

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

      /*
    ==========================
    CREATE ORDER
    ==========================
    */

      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createOrder.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /*
    ==========================
    USER MY ORDERS
    ==========================
    */

      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload.orders;

        state.page = action.payload.page;

        state.pages = action.payload.pages;

        state.total = action.payload.total;
      })

      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /*
    ==========================
    SINGLE ORDER
    ==========================
    */

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

      /*
    ==========================
    CANCEL ORDER
    ==========================
    */

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

      /*
    ==========================
    SELLER ORDERS
    ==========================
    */

      .addCase(getSellerOrders.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getSellerOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.sellerOrders = action.payload.orders;

        state.page = action.payload.page;

        state.pages = action.payload.pages;

        state.total = action.payload.total;
      })

      .addCase(getSellerOrders.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /*
    ==========================
    SELLER UPDATE STATUS
    ==========================
    */

      .addCase(sellerUpdateOrderStatus.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(sellerUpdateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;

        state.sellerOrders = state.sellerOrders.map((order) =>
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

      /*
    ==========================
    ADMIN GET ORDERS
    ==========================
    */

      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.adminOrders = action.payload.orders;

        state.page = action.payload.page;

        state.pages = action.payload.pages;

        state.total = action.payload.total;
      })

      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /*
    ==========================
    ADMIN UPDATE ORDER STATUS
    ==========================
    */

      .addCase(adminUpdateOrderStatus.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(adminUpdateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;

        state.adminOrders = state.adminOrders.map((order) =>
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

      /*
    ==========================
    ADMIN UPDATE PAYMENT STATUS
    ==========================
    */

      .addCase(updatePaymentStatus.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        state.loading = false;

        state.adminOrders = state.adminOrders.map((order) =>
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
