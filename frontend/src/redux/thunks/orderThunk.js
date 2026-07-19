import { createAsyncThunk } from "@reduxjs/toolkit";
import * as orderService from "../../services/order.service";

// ==============================
// User
// ==============================

// Create Order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (data, { rejectWithValue }) => {
    try {
      return await orderService.createOrder(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order",
      );
    }
  },
);

// My Orders
export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await orderService.getMyOrders();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders",
      );
    }
  },
);

// Get Single Order
export const getSingleOrder = createAsyncThunk(
  "order/getSingleOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      return await orderService.getSingleOrder(orderId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order",
      );
    }
  },
);

// Cancel Order
export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      return await orderService.cancelOrder(orderId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel order",
      );
    }
  },
);

// ==============================
// Seller
// ==============================

// Seller Orders
export const getSellerOrders = createAsyncThunk(
  "order/getSellerOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await orderService.getSellerOrders();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller orders",
      );
    }
  },
);

// Seller Update Order Status
export const sellerUpdateOrderStatus = createAsyncThunk(
  "order/sellerUpdateOrderStatus",
  async ({ orderId, orderStatus }, { rejectWithValue }) => {
    try {
      return await orderService.sellerUpdateOrderStatus({
        orderId,
        orderStatus,
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order status",
      );
    }
  },
);

// ==============================
// Admin
// ==============================

// Get All Orders
export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await orderService.getAllOrders();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all orders",
      );
    }
  },
);

// Admin Update Order Status
export const adminUpdateOrderStatus = createAsyncThunk(
  "order/adminUpdateOrderStatus",
  async ({ orderId, orderStatus }, { rejectWithValue }) => {
    try {
      return await orderService.adminUpdateOrderStatus({
        orderId,
        orderStatus,
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order status",
      );
    }
  },
);

// Update Payment Status
export const updatePaymentStatus = createAsyncThunk(
  "order/updatePaymentStatus",
  async ({ orderId, paymentStatus }, { rejectWithValue }) => {
    try {
      return await orderService.updatePaymentStatus({
        orderId,
        paymentStatus,
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update payment status",
      );
    }
  },
);
