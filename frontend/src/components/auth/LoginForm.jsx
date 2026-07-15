import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { login, googleLogin } from "../../services/auth.service";
import { loginSuccess } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { FaEnvelope, FaLock, FaShoppingBag } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const handleForgetPassword = () => {
    navigate("/forgot-password");
  };
  // Normal login
  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);

      const data = await login(values);

      dispatch(
        loginSuccess({
          user: data.user,
        }),
      );

      alert(data.message);
      resetForm();

      if (data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const idToken = credentialResponse?.credential;

      if (!idToken) {
        alert("Google login failed");
        return;
      }

      setLoading(true);

      const data = await googleLogin(idToken);

      dispatch(
        loginSuccess({
          user: data.user,
        }),
      );

      if (data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Google Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 p-4 rounded-full shadow">
            <FaShoppingBag className="text-white text-3xl" />
          </div>

          <h2 className="text-3xl font-bold mt-4 text-gray-800">
            Welcome to ShopVerse
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Login to continue shopping
          </p>
        </div>

        {/* Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <Field
                name="email"
                type="email"
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgetPassword}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 rounded-lg font-semibold"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            {/* OR */}
            <div className="flex items-center gap-2 my-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google Login */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => alert("Google Login Failed")}
              />
            </div>
          </Form>
        </Formik>

        {/* Register Link */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
