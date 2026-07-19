import { createAsyncThunk } from "@reduxjs/toolkit";
import * as productService from "../../services/product.service";

// ============================
// Get All Products
// ============================

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      return await productService.getAllProducts(params);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products",
      );
    }
  },
);

// ============================
// Get Single Product
// ============================

export const getSingleProduct = createAsyncThunk(
  "product/getSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      return await productService.getSingleProduct(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product",
      );
    }
  },
);

// ============================
// Seller Products
// ============================

export const getSellerProducts = createAsyncThunk(
  "product/getSellerProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await productService.getSellerProducts();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller products",
      );
    }
  },
);

// ============================
// Add Product
// ============================

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (formData, { rejectWithValue }) => {
    try {
      return await productService.addProduct(formData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add product",
      );
    }
  },
);

// ============================
// Update Product
// ============================

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      return await productService.updateProduct({ id, formData });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product",
      );
    }
  },
);

// ============================
// Delete Product
// ============================

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product",
      );
    }
  },
);
