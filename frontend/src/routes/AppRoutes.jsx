import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import SellerLayout from "../layouts/SellerLayout";
import AdminLayout from "../layouts/AdminLayout";

// ===================
// Auth Pages
// ===================

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import EmailVerifiedPage from "../pages/auth/EmailVerifiedPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";

// ===================
// User Pages
// ===================

import HomePage from "../pages/public/Home";
// import ProductDetailsPage from "../pages/public/ProductDetailsPage";
import ProductsPage from "../pages/public/Products";
import ProductDetailsPage from "../pages/public/ProductDetails";
import CartPage from "../pages/user/Cart";
import WishlistPage from "../pages/user/Wishlist";
import CheckoutPage from "../pages/user/Checkout";
import OrdersPage from "../pages/user/Order";
import OrderDetailsPage from "../pages/user/OrderDetails";
import ProfilePage from "../pages/user/Profile";
import ReviewsPage from "../pages/user/Review";
import NotificationsPage from "../pages/user/Notification";

// ===================
// Seller Pages
// ===================

import SellerDashboard from "../pages/seller/Dashboard";
import AddProduct from "../pages/seller/AddProduct";
import SellerProducts from "../pages/seller/Products";
import EditProduct from "../pages/seller/EditProduct";
import SellerOrders from "../pages/seller/Orders";
import SellerReviews from "../pages/seller/Reviews";

// ===================
// Admin Pages
// ===================

import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Sellers from "../pages/admin/Sellers";
import Categories from "../pages/admin/Categories";
import AdminProducts from "../pages/admin/Products";
import AdminOrders from "../pages/admin/Orders";

import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Redirect */}

      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* ================= Main Website ================= */}

      <Route element={<MainLayout />}>
        {/* Public */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        {/* Auth */}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<EmailVerifiedPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* User */}

        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Route>

      {/* ================= Seller ================= */}

      <Route path="/seller" element={<SellerLayout />}>
        <Route path="dashboard" element={<SellerDashboard />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="products" element={<SellerProducts />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
        <Route path="orders" element={<SellerOrders />} />
        <Route path="reviews" element={<SellerReviews />} />
      </Route>

      {/* ================= Admin ================= */}

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="sellers" element={<Sellers />} />
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>

      {/* ================= 404 ================= */}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
