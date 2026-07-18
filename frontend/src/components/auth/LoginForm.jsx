import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { FaEnvelope, FaLock, FaShoppingBag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { loginUser, googleLoginUser } from "../../redux/thunks/authThunk";

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),

  password: Yup.string().required("Password is required"),
});

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const redirectUser = (role) => {
    switch (role) {
      case "ADMIN":
        navigate("/admin");
        break;

      case "SELLER":
        navigate("/seller");
        break;

      default:
        navigate("/home");
    }
  };

  // Normal Login
  const handleSubmit = async (values, { resetForm }) => {
    const resultAction = await dispatch(loginUser(values));

    if (loginUser.fulfilled.match(resultAction)) {
      const user = resultAction.payload.user;

      resetForm();

      redirectUser(user.role);
    } else {
      alert(resultAction.payload || "Login failed");
    }
  };

  // Google Login
  const handleGoogleLogin = async (credentialResponse) => {
    const idToken = credentialResponse?.credential;

    if (!idToken) {
      alert("Google login failed");
      return;
    }

    const resultAction = await dispatch(googleLoginUser(idToken));

    if (googleLoginUser.fulfilled.match(resultAction)) {
      const user = resultAction.payload.user;

      redirectUser(user.role);
    } else {
      alert(resultAction.payload || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center">
          <div className="rounded-full bg-blue-600 p-4">
            <FaShoppingBag className="text-3xl text-white" />
          </div>

          <h1 className="mt-4 text-3xl font-bold text-gray-800">
            Welcome to ShopVerse
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to continue shopping
          </p>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            {/* Email */}
            <div>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />

                <Field
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none focus:border-blue-500"
                />
              </div>

              <ErrorMessage
                name="email"
                component="p"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />

                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none focus:border-blue-500"
                />
              </div>

              <ErrorMessage
                name="password"
                component="p"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            {/* Forgot Password */}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:bg-blue-400"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Divider */}

            <div className="flex items-center">
              <div className="h-px flex-1 bg-gray-300"></div>

              <span className="mx-3 text-sm text-gray-500">OR</span>

              <div className="h-px flex-1 bg-gray-300"></div>
            </div>

            {/* Google Login */}

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => alert("Google login failed")}
              />
            </div>
          </Form>
        </Formik>

        {/* Register */}

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
