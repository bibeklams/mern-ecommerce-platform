import { createSlice } from "@reduxjs/toolkit";
import {
  getProfile,
  getAllUsers,
  getAllSellers,
  getSingleUser,
  applyForSeller,
  approveSeller,
  rejectSeller,
  banUser,
  unbanUser,
  suspendUser,
  unsuspendUser,
} from "../thunks/userThunk";

const initialState = {
  users: [],
  sellers: [],
  user: null,
  profile: null,

  loading: false,
  error: null,
  success: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },

    clearUserSuccess: (state) => {
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    // =========================
    // Get Profile
    // =========================

    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.user;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =========================
    // Get All Users
    // =========================

    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =========================
    // Get All Sellers
    // =========================

    builder
      .addCase(getAllSellers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload.users;
      })
      .addCase(getAllSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =========================
    // Get Single User
    // =========================

    builder
      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =========================
    // Apply Seller
    // =========================

    builder
      .addCase(applyForSeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyForSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.user;
        state.success = action.payload.message;
      })
      .addCase(applyForSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =========================
    // Approve Seller
    // =========================

    builder
      .addCase(approveSeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;

        state.users = state.users.map((user) =>
          user._id === action.payload.user._id ? action.payload.user : user,
        );

        state.sellers.push(action.payload.user);
      })
      .addCase(approveSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =========================
    // Reject Seller
    // =========================

    builder
      .addCase(rejectSeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(rejectSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;

        state.users = state.users.map((user) =>
          user._id === action.payload.user._id ? action.payload.user : user,
        );
      })
      .addCase(rejectSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =========================
    // Ban User
    // =========================

    builder
      .addCase(banUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(banUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(banUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =========================
    // Unban User
    // =========================

    builder
      .addCase(unbanUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(unbanUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(unbanUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =========================
    // Suspend User
    // =========================

    builder
      .addCase(suspendUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(suspendUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(suspendUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =========================
    // Unsuspend User
    // =========================

    builder
      .addCase(unsuspendUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(unsuspendUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(unsuspendUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserError, clearUserSuccess } = userSlice.actions;

export default userSlice.reducer;
