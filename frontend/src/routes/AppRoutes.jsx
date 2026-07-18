import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// Auth Pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import EmailVerifiedPage from "../pages/auth/EmailVerifiedPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";

// User Pages
import HomePage from "../pages/user/Home";
import ProductsPage from "../pages/user/Products";
import ProductDetailsPage from "../pages/user/ProductDetails";
import CartPage from "../pages/user/Cart";
import WishlistPage from "../pages/user/Wishlist";
import CheckoutPage from "../pages/user/Checkout";
import OrdersPage from "../pages/user/Order";
import OrderDetailsPage from "../pages/user/OrderDetails";
import ProfilePage from "../pages/user/Profile";
import ReviewsPage from "../pages/user/Review";
import NotificationsPage from "../pages/user/Notification";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Redirect */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Auth Routes (without MainLayout) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-email" element={<EmailVerifiedPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* User Routes */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />

        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailsPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
