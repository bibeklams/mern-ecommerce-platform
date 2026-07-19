import { createSlice } from "@reduxjs/toolkit";

import {
  getAllCategories,
  getSingleCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../thunks/categoryThunk";

const initialState = {
  categories: [],
  category: null,

  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",

  initialState,

  reducers: {
    clearCategory(state) {
      state.category = null;
    },

    clearCategoryError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================
      // Get All Categories
      // ==========================

      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
      })

      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Get Single Category
      // ==========================

      .addCase(getSingleCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSingleCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.category;
      })

      .addCase(getSingleCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Add Category
      // ==========================

      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories.push(action.payload.category);
      })

      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Update Category
      // ==========================

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = state.categories.map((category) =>
          category._id === action.payload.category._id
            ? action.payload.category
            : category,
        );

        if (state.category?._id === action.payload.category._id) {
          state.category = action.payload.category;
        }
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Delete Category
      // ==========================

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = state.categories.filter(
          (category) => category._id !== action.meta.arg,
        );

        if (state.category?._id === action.meta.arg) {
          state.category = null;
        }
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCategory, clearCategoryError } = categorySlice.actions;

export default categorySlice.reducer;
