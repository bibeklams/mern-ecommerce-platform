import { createAsyncThunk } from "@reduxjs/toolkit";
import * as categoryService from "../../services/category.service";

// ==========================
// Get All Categories
// ==========================

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await categoryService.getAllCategories();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories",
      );
    }
  },
);

// ==========================
// Get Single Category
// ==========================

export const getSingleCategory = createAsyncThunk(
  "category/getSingleCategory",
  async (id, { rejectWithValue }) => {
    try {
      return await categoryService.getSingleCategory(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch category",
      );
    }
  },
);

// ==========================
// Add Category
// ==========================

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (formData, { rejectWithValue }) => {
    try {
      return await categoryService.addCategory(formData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add category",
      );
    }
  },
);

// ==========================
// Update Category
// ==========================

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      return await categoryService.updateCategory({ id, formData });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update category",
      );
    }
  },
);

// ==========================
// Delete Category
// ==========================

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      return await categoryService.deleteCategory(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete category",
      );
    }
  },
);
