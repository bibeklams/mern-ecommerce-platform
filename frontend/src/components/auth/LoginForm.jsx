import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { FaEnvelope, FaLock, FaShoppingBag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";

import { loginUser, googleLoginUser } from "../../redux/thunks/authThunk";

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),

  password: Yup.string().required("Password is required"),
});

// Shared field wrapper — matches the one used on the register page,
// dark glass surface with an animated error message underneath.
const FormField = ({ icon, name, type, placeholder }) => (
  <div>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
        {icon}
      </span>

      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className="
        w-full pl-10 pr-4 py-2.5
        rounded-lg
        bg-white/5
        border border-white/10
        text-sm text-white placeholder:text-slate-500
        outline-none
        focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20
        transition-colors duration-200
        "
      />
    </div>

    <ErrorMessage name={name}>
      {(msg) => (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-rose-400 mt-1.5 pl-1"
        >
          {msg}
        </motion.p>
      )}
    </ErrorMessage>
  </div>
);

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const redirectUser = (role) => {
    // switch (role) {
    //   case "ADMIN":
    //     navigate("/admin/dashboard");
    //     break;

    //   case "SELLER":
    //     navigate("/seller/dashboard");
    //     break;

    //   default:
    navigate("/home");
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
    <div
      className="
      min-h-screen flex items-center justify-center
      bg-[#0B1120]
      px-4
      relative
      overflow-hidden
      "
    >
      {/* Ambient gradient glow — same accent language as navbar/register */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
        w-full max-w-md
        bg-white/[0.04]
        backdrop-blur-xl
        shadow-2xl shadow-black/40
        rounded-2xl
        p-8
        border border-white/[0.08]
        relative
        "
      >
        {/* Header */}
        <div className="mb-8 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
              delay: 0.1,
            }}
            className="
            h-14 w-14 flex items-center justify-center
            rounded-full
            bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400
            shadow-lg shadow-indigo-500/30
            "
          >
            <FaShoppingBag className="text-xl text-white" />
          </motion.div>

          <h1 className="mt-4 text-2xl font-bold text-white tracking-tight">
            Welcome back
          </h1>

          <p className="mt-1 text-sm text-slate-400">
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
          <Form className="space-y-4">
            <FormField
              icon={<FaEnvelope size={14} />}
              type="email"
              name="email"
              placeholder="Email address"
            />

            <FormField
              icon={<FaLock size={14} />}
              type="password"
              name="password"
              placeholder="Password"
            />

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className="
              w-full py-2.5
              rounded-lg
              bg-gradient-to-r from-indigo-500 to-violet-500
              disabled:from-slate-700 disabled:to-slate-700
              disabled:cursor-not-allowed
              text-white text-sm font-semibold
              shadow-lg shadow-indigo-500/25
              flex items-center justify-center gap-2
              transition-shadow duration-200
              "
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        ease: "linear",
                      }}
                      className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white"
                    />
                    Logging in...
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Login
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Divider */}
            <div className="flex items-center pt-1">
              <div className="h-px flex-1 bg-white/10" />
              <span className="mx-3 text-xs uppercase tracking-wider text-slate-500">
                Or
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Google Login */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center rounded-lg overflow-hidden [color-scheme:light]"
            >
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => alert("Google login failed")}
              />
            </motion.div>
          </Form>
        </Formik>

        {/* Register */}
        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default LoginForm;
