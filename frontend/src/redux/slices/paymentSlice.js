import { createSlice } from "@reduxjs/toolkit";
import {
  initiateEsewaPayment,
  verifyEsewaPayment,
} from "../thunks/paymentThunk";

const initialState = {
  paymentData: null,
  paymentResult: null,

  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,

  reducers: {
    clearPaymentError(state) {
      state.error = null;
    },

    clearPayment(state) {
      state.paymentData = null;
      state.paymentResult = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Initiate Payment

      .addCase(initiateEsewaPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(initiateEsewaPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentData = action.payload;
      })

      .addCase(initiateEsewaPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify Payment

      .addCase(verifyEsewaPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyEsewaPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentResult = action.payload;
      })

      .addCase(verifyEsewaPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPaymentError, clearPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
