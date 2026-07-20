import { createAsyncThunk } from "@reduxjs/toolkit";
import * as paymentService from "../../services/payment.service";

// Initiate eSewa
export const initiateEsewaPayment = createAsyncThunk(
  "payment/initiateEsewaPayment",
  async (orderId, thunkAPI) => {
    try {
      return await paymentService.initiateEsewaPayment(orderId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Payment failed",
      );
    }
  },
);

// Verify Payment
export const verifyEsewaPayment = createAsyncThunk(
  "payment/verifyEsewaPayment",
  async (transactionUuid, thunkAPI) => {
    try {
      return await paymentService.verifyEsewaPayment(transactionUuid);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Verification failed",
      );
    }
  },
);
