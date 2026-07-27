import { createSlice } from "@reduxjs/toolkit";

import {
  getAllProducts,
  getSingleProduct,
  getSellerProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
  toggleFeatured,
  changeProductStatus,
} from "../thunks/productThunk";

const initialState = {
  // Public
  products: [],
  product: null,

  // Seller
  sellerProducts: [],

  // Admin
  adminProducts: [],
  currentPage: 1,
  totalPages: 1,
  totalProducts: 0,

  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },

    clearProductError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =====================================
      // Get All Products
      // =====================================

      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload.products;
      })

      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // =====================================
      // Get Single Product
      // =====================================

      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.product = action.payload.product;
      })

      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // =====================================
      // Seller Products
      // =====================================

      .addCase(getSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSellerProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.sellerProducts = action.payload.products;
      })

      .addCase(getSellerProducts.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // =====================================
      // Add Product
      // =====================================

      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // =====================================
      // Update Product
      // =====================================

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // =====================================
      // Delete Product
      // =====================================

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.sellerProducts = state.sellerProducts.filter(
          (product) => product._id !== action.payload.id,
        );

        state.adminProducts = state.adminProducts.filter(
          (product) => product._id !== action.payload.id,
        );
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // =====================================
      // Admin Products
      // =====================================

      .addCase(getAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAdminProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.adminProducts = action.payload.products;

        state.currentPage = action.payload.currentPage;

        state.totalPages = action.payload.totalPages;

        state.totalProducts = action.payload.totalProducts;
      })

      .addCase(getAdminProducts.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // =====================================
      // Toggle Featured
      // =====================================

      .addCase(toggleFeatured.pending, (state) => {
        state.loading = true;
      })

      .addCase(toggleFeatured.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.adminProducts.findIndex(
          (product) => product._id === action.payload.product._id,
        );

        if (index !== -1) {
          state.adminProducts[index] = action.payload.product;
        }
      })

      .addCase(toggleFeatured.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // =====================================
      // Change Product Status
      // =====================================

      .addCase(changeProductStatus.pending, (state) => {
        state.loading = true;
      })

      .addCase(changeProductStatus.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.adminProducts.findIndex(
          (product) => product._id === action.payload.product._id,
        );

        if (index !== -1) {
          state.adminProducts[index] = action.payload.product;
        }
      })

      .addCase(changeProductStatus.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export const { clearProduct, clearProductError } = productSlice.actions;

export default productSlice.reducer;
