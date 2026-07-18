import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../../services/auth.service";

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

// Google Login
export const googleLoginUser = createAsyncThunk(
  "auth/googleLoginUser",
  async (idToken, { rejectWithValue }) => {
    try {
      return await authService.googleLogin(idToken);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Google login failed",
      );
    }
  },
);

// Verify Email
export const verifyEmailUser = createAsyncThunk(
  "auth/verifyEmailUser",
  async (data, { rejectWithValue }) => {
    try {
      return await authService.verifyEmail(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Email verification failed",
      );
    }
  },
);

// Get Profile
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getProfile();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile",
      );
    }
  },
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      return await authService.forgotPassword(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send OTP",
      );
    }
  },
);

// Verify Reset OTP
export const verifyResetOtp = createAsyncThunk(
  "auth/verifyResetOtp",
  async (data, { rejectWithValue }) => {
    try {
      return await authService.verifyResetOtp(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed",
      );
    }
  },
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      return await authService.resetPassword(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password reset failed",
      );
    }
  },
);

// Logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.logout();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);

// Logout From All Devices
export const logoutAllUser = createAsyncThunk(
  "auth/logoutAllUser",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.logoutAll();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout from all devices failed",
      );
    }
  },
);
